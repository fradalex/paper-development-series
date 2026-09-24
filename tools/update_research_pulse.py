"""Publish a weekly, source-linked research prompt. Standard library only."""
import datetime as dt
import json
import pathlib
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'research-pulse.json'
TODAY = dt.datetime.now(dt.timezone.utc).date()
SINCE = (TODAY - dt.timedelta(days=120)).isoformat()
TOPICS = [
    ('AI and discovery', 'artificial intelligence scientific discovery', 'AI scientific discovery'),
    ('Innovation and firms', 'technology innovation entrepreneurship', 'technological innovation entrepreneurship'),
    ('Science and society', 'science technology innovation policy', 'technology innovation policy'),
]


def matches_topic(topic, title):
    text = title.casefold()
    def has(*terms):
        return any(term in text for term in terms)
    if topic == 'AI and discovery':
        return (has('artificial intelligence', 'machine learning') or re.search(r'(?<!\w)ai(?!\w)', text)) and has(
            'scien', 'discover', 'research', 'laborator', 'scholar')
    if topic == 'Innovation and firms':
        return has('innovat', 'technolog') and has('firm', 'entrepreneu', 'start-up', 'startup', 'business', 'industr')
    return has('technolog', 'artificial intelligence', 'machine learning', 'research and development',
               'r&d', 'innovation policy') and has('policy', 'diffus', 'societ', 'social', 'governance', 'public')


def request_json(url, *, data=None, headers=None):
    req = urllib.request.Request(url, data=data, headers={
        'User-Agent': 'PaperDevelopmentSeries/1.0 (research-pulse; https://github.com/fradalex/paper-development-series)',
        'Accept': 'application/json', **(headers or {})}, method='POST' if data else 'GET')
    with urllib.request.urlopen(req, timeout=25) as response:
        return json.load(response)


def canonical_paper(title, date, doi, url, source):
    title = re.sub(r'\s+', ' ', re.sub(r'<[^>]*>', '', title or '')).strip()
    doi = str(doi or '').strip().removeprefix('https://doi.org/').lower()
    date = str(date or '')[:10]
    if not title or not re.fullmatch(r'\d{4}-\d{2}-\d{2}', date):
        return None
    if not SINCE <= date <= TODAY.isoformat():
        return None
    link = 'https://doi.org/' + urllib.parse.quote(doi, safe='/._;-()') if doi else url
    if not link or not link.startswith('https://'):
        return None
    return {'title': title[:240], 'date': date, 'url': link, 'source': source, 'doi': doi}


def openalex(query):
    params = {'search': query, 'filter': f'from_publication_date:{SINCE},to_publication_date:{TODAY.isoformat()},type:article',
              'per_page': '18', 'select': 'id,display_name,publication_date,doi,primary_location'}
    payload = request_json('https://api.openalex.org/works?' + urllib.parse.urlencode(params))
    found = []
    for item in payload.get('results', []):
        landing = (item.get('primary_location') or {}).get('landing_page_url')
        paper = canonical_paper(item.get('display_name'), item.get('publication_date'),
                                item.get('doi'), landing, 'OpenAlex')
        if paper:
            found.append(paper)
    return found


def crossref(query):
    params = {'query.title': query, 'filter': f'from-pub-date:{SINCE},until-pub-date:{TODAY.isoformat()},type:journal-article',
              'sort': 'published', 'order': 'desc', 'rows': '15',
              'select': 'DOI,title,published,URL'}
    payload = request_json('https://api.crossref.org/works?' + urllib.parse.urlencode(params))
    found = []
    for item in payload.get('message', {}).get('items', []):
        parts = (item.get('published') or {}).get('date-parts', [[]])[0]
        try:
            date = dt.date(*(parts + [1] * (3 - len(parts)))).isoformat()
        except (TypeError, ValueError):
            continue
        paper = canonical_paper((item.get('title') or [''])[0], date, item.get('DOI'), item.get('URL'), 'Crossref')
        if paper:
            found.append(paper)
    return found


def gather():
    groups = []
    for label, oa_query, cr_query in TOPICS:
        papers = []
        for provider, query in [(openalex, oa_query), (crossref, cr_query)]:
            try:
                papers.extend(provider(query))
            except (urllib.error.URLError, ValueError, KeyError, IndexError) as exc:
                print(f'{label}: {provider.__name__} unavailable: {exc}', file=sys.stderr)
        seen = set()
        unique = []
        for paper in sorted(papers, key=lambda p: p['date'], reverse=True):
            if not matches_topic(label, paper['title']):
                continue
            identity = paper['doi'] or paper['title'].casefold()
            if identity not in seen:
                seen.add(identity)
                unique.append(paper)
        if unique:
            groups.append((label, unique[:6]))
    return groups


QUESTION_BANK = {
    'AI and discovery': [
        (('agent', 'assistant'), 'When should AI act as a research partner, and when should scientists retain control?'),
        (('discover', 'hypothes'), 'How should we evaluate discoveries when AI helps generate the hypotheses?'),
        (('open', 'data', 'access'), 'Can AI broaden access to scientific discovery without concentrating its resources?'),
        (('experiment', 'automat'), 'What changes when AI systems design and conduct parts of the research process?'),
    ],
    'Innovation and firms': [
        (('firm', 'entrepreneu'), 'When do new technologies open opportunities for young firms rather than reinforce incumbents?'),
        (('region', 'local'), 'What turns new technological knowledge into innovative ventures across regions?'),
        (('artificial intelligence', ' ai '), 'How does AI change the way firms search for and develop new ideas?'),
        (('adopt', 'diffus'), 'What helps promising inventions become innovations that firms actually adopt?'),
    ],
    'Science and society': [
        (('region', 'place'), 'Which innovation policies help the benefits of research reach more regions?'),
        (('diffus', 'inequal'), 'How can policy respond when new technologies spread unevenly?'),
        (('public', 'invest'), 'Who benefits from public investment in emerging technologies?'),
        (('ai', 'artificial intelligence'), 'How should governments evaluate the social effects of AI research and innovation?'),
    ],
}


def choose_questions(groups):
    """Select open discussion questions from a curated bank using recent title themes."""
    selected = []
    for topic, papers in groups:
        titles = [paper['title'].casefold() for paper in papers]
        bank = QUESTION_BANK[topic]
        scores = [sum(any(word in title for word in cues) for title in titles) for cues, _ in bank]
        tied = [i for i, score in enumerate(scores) if score == max(scores)]
        question = bank[tied[TODAY.isocalendar().week % len(tied)]][1]
        selected.append({'topic': topic, 'question': question})
    return selected


def main():
    previous = json.loads(OUTPUT.read_text()) if OUTPUT.exists() else {}
    groups = gather()
    if not groups:
        raise RuntimeError('No dated, linkable papers were retrieved; keeping the last published issue.')
    questions = choose_questions(groups)
    archive = previous.get('archive', []) if isinstance(previous.get('archive'), list) else []
    archive = [{'updated': item['updated'],
                'questions': [{'topic': q['topic'], 'question': q['question']}
                              for q in item.get('questions', []) if 'topic' in q and 'question' in q]}
               for item in archive if isinstance(item, dict) and item.get('updated') != TODAY.isoformat()]
    if previous.get('updated') and previous.get('updated') != TODAY.isoformat() and previous.get('questions'):
        archive.insert(0, {'updated': previous['updated'],
                           'questions': [{'topic': q['topic'], 'question': q['question']}
                                         for q in previous['questions']]})
    issue = {'updated': TODAY.isoformat(), 'mode': 'curated',
             'questions': questions, 'archive': archive[:12]}
    OUTPUT.write_text(json.dumps(issue, indent=2, ensure_ascii=False) + '\n')
    print(f'Published {len(questions)} questions from {sum(len(p) for _, p in groups)} retrieved papers.')


if __name__ == '__main__':
    main()
