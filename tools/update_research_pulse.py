"""Rotate reviewed research questions every three UTC days; no external API calls."""
import datetime as dt
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BANK = ROOT / "research-questions.json"
OUTPUT = ROOT / "research-pulse.json"
TODAY = dt.datetime.now(dt.timezone.utc).date()


def load_bank():
    raw = BANK.read_bytes()
    bank = json.loads(raw)
    topics = bank["topics"]
    if len(topics) != 3 or any(len(entries) < 30 for entries in topics.values()):
        raise ValueError("The question bank needs three themes with at least 30 prompts each.")
    sources = bank["sources"]
    questions = []
    for topic, entries in topics.items():
        for entry in entries:
            question = entry["question"].strip()
            if not question.endswith("?") or not entry["sources"] or any(
                source not in sources for source in entry["sources"]
            ):
                raise ValueError(f"Invalid prompt or source in {topic}: {question}")
            questions.append(question)
    if len(questions) != len(set(questions)):
        raise ValueError("Research questions must be distinct across all themes.")
    return topics, hashlib.sha256(raw).hexdigest()


def choose_questions(topics, previous):
    # Keep the current issue and the last 29 issues: 30 questions per theme
    # therefore yield 30 issues (90 days) before any prompt is reused.
    history = {}
    for issue in [previous] + previous.get("archive", [])[:29]:
        for item in issue.get("questions", []):
            history.setdefault(item.get("topic"), []).append(item.get("question"))
    selected = []
    for topic, entries in topics.items():
        recent = history.get(topic, [])
        question = next(
            (entry["question"] for entry in entries if entry["question"] not in recent),
            None,
        )
        if question is None:
            # When the pool has been exhausted, use the least recently seen prompt.
            question = max(
                (entry["question"] for entry in entries),
                key=lambda value: recent.index(value) if value in recent else len(recent),
            )
        selected.append({"topic": topic, "question": question})
    return selected


def main():
    topics, bank_sha = load_bank()
    previous = json.loads(OUTPUT.read_text()) if OUTPUT.exists() else {}
    try:
        age = (TODAY - dt.date.fromisoformat(previous.get("updated"))).days
    except (TypeError, ValueError):
        age = None
    if (
        age is not None
        and 0 <= age < 3
        and previous.get("bank_sha") == bank_sha
        and {item.get("topic") for item in previous.get("questions", [])} == set(topics)
    ):
        print("Current reviewed questions are less than three days old.")
        return

    questions = choose_questions(topics, previous)
    archive = previous.get("archive", [])
    if not isinstance(archive, list):
        archive = []
    archive = archive.copy()
    if previous.get("updated") and previous.get("questions"):
        archive.insert(0, {
            "updated": previous["updated"],
            "questions": previous["questions"],
        })
    issue = {
        "updated": TODAY.isoformat(),
        "mode": "curated",
        "bank_sha": bank_sha,
        "questions": questions,
        "archive": archive[:29],
    }
    OUTPUT.write_text(json.dumps(issue, indent=2, ensure_ascii=False) + "\n")
    print(f"Published {len(issue['questions'])} reviewed questions from a {sum(map(len, topics.values()))}-question bank.")


if __name__ == "__main__":
    main()
