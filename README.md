# Paper Development Series website

A static website for GitHub Pages. The weekly question card is built remotely in GitHub Actions. It does not need an AI API key or paid model calls. The site uses a single page, an editable programme file, and automatic upcoming/archive grouping.

## Before publishing

Open `site-data.js` and add your public contact email, organiser names, optional proposal form link, and confirmed sessions. All fields are optional except a session's `date`, `speaker`, and `title`. If details are not ready, the site displays honest "to be announced" messages.

Example session (remove the surrounding `/*` and `*/` from the sample in the file, or paste this object inside the `sessions: [ ... ]` list):

```js
{
  date: "2026-10-15",
  time: "16:00 CEST",
  speaker: "Alex Smith",
  affiliation: "University name",
  title: "A working paper title",
  description: "A short description of the project and the questions for discussion.",
  location: "Online",
  link: "https://example.org/session-details"
},
```

Use the speaker's permission before publishing their name, title, abstract, or email address. Use `YYYY-MM-DD` for dates. A session remains in Upcoming through its calendar date and moves to Archive the next day for visitors in their own time zone. Add your time zone to the `time` field, for example `16:00 CEST`. Links must start with `https://`.

To change the introductory wording, edit `index.html`. To change colours or layout, edit `styles.css`. No fictional sessions have been included.

## Edit the organisers

Open `site-data.js` and find the `organisers: [ ... ]` list. Replace the nine placeholder entries with real names and biographies. For example:

```js
{ name: "Alex Smith", photo: "alex-smith.jpg", bio: "Alex studies innovation and regional development. They help coordinate the paper discussions." },
```

To add a person, copy a row before the closing `],`; to remove one, delete their row. Keep the comma after each row and quotation marks around text. Use **Add file → Upload files** in the repository to upload portraits beside `index.html`, then enter the exact filename in `photo`. Leave `photo: ""` to display the built-in portrait placeholder. A portrait cropped near 3:4 works best. Leave `bio: ""` to show “Biography to follow.” Click **Commit changes** on GitHub; the carousel and bio cards will update on the published site. Names appear in the order listed. The carousel advances every nine seconds and pauses while a biography is open. It resumes after the biography closes.

## Publish on GitHub Pages

1. Create a free GitHub account or an organisation account shared by the organisers. A dedicated organisation makes handover easier.
2. Create a **public** repository called `paper-development-series` and upload the contents of this folder to the repository root. Upload the files themselves, not the enclosing folder or ZIP. The file `index.html` must be at the root. Keep `.nojekyll` if your upload method includes hidden files.
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **GitHub Actions** as the source. Save. The `Publish research pulse` workflow now publishes both site edits and scheduled research updates.
4. The address will be `https://ACCOUNT.github.io/paper-development-series/` (replace `ACCOUNT` with your username or organisation name). GitHub may take several minutes to publish the first time.
5. To update a session, open `site-data.js` on GitHub, click the pencil icon, edit it, and commit the change to `main`. The website will republish automatically through the same workflow. Give other organisers repository access under **Settings → Collaborators and teams** (the exact menu name depends on account type).

For a shorter `https://ACCOUNT.github.io/` address, name the repository exactly `ACCOUNT.github.io` instead. The included relative links work with either repository name.

## Automatic research pulse

The workflow in `.github/workflows/research-pulse.yml` checks recent OpenAlex and Crossref metadata every Tuesday at 08:17 UTC. It uses that metadata to choose three open discussion questions from a curated 36-question bank on science, technology and innovation. Each topic gets a different question every week; an earlier question can return after the 12-question set for that topic has been used. It republishes the page automatically; previous issues are retained for up to 12 weeks in `research-pulse.json`. Visitors only download the questions and do not see article links. The site never calls an AI model, so no API key or AI tokens are needed.

The landing card shows one question at a time and advances every 12 seconds with a soft dissolve. Visitors can select a question or pause the rotation. Reduced-motion settings disable automatic transitions. If the literature sources are unavailable, the weekly rotation still selects questions from the curated bank. These are discussion prompts, not measured claims about which topics are statistically trending.

To refresh immediately, open **Actions → Publish research pulse → Run workflow**. The repository's **Settings → Pages** source must be **GitHub Actions** for scheduled updates to publish.

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server 8000` from this folder and visit `http://localhost:8000/`.

## Project files

- `index.html`: page content and structure
- `styles.css`: responsive visual design
- `site-data.js`: organisers, contact details, and sessions
- `script.js`: automatic session display, rotating question card, and mobile navigation
- `research-pulse.json`: current research questions and archive
- `tools/update_research_pulse.py`: weekly literature scan and question selection
- `.github/workflows/research-pulse.yml`: weekly refresh and Pages publication
- `favicon.svg`: browser icon
- `.nojekyll`: publish static files without Jekyll processing

The fonts use Google Fonts when available; Georgia and Arial serve as fallbacks. No visitor tracking or analytics are included.

## Automatic seminar emails through Kit

The separate `.github/workflows/session-reminders.yml` workflow checks `site-data.js` each day. For each confirmed session with a date, speaker, title, and time, it schedules one email seven calendar days before the event and one on the event date. It uses Europe/Rome dates, sends from `info@paperdevelopmentseries.org`, and uses Kit's subscribed audience. Subjects and email bodies are filled from the session's title, speaker, date, time, location, description, and optional online meeting link. Kit handles delivery and unsubscribe links. No subscriber addresses are stored in GitHub. `TBD` rows and rows with `reminders: false` are excluded. The fictitious September test session has reminders disabled.

To activate:

1. In Kit, verify `info@paperdevelopmentseries.org` as a sending address, and finish the domain authentication shown under **Settings → Email → Verified Sending Domains**. Check that imported contacts appear as active subscribers and that the website form adds an active subscriber.
2. In Kit **Settings → Developer**, create a **V4 API key**. Copy it immediately; Kit does not show it again. Do not paste it into `site-data.js`, a GitHub file, or a chat.
3. In the GitHub repository choose **Settings → Secrets and variables → Actions → New repository secret**. Name it exactly `KIT_API_KEY` and paste the V4 key as its value. The workflow remains inactive when the secret is absent.
4. Add a confirmed future session in `site-data.js`. Set `time` explicitly, ideally with `CET` or `CEST`, and use `link` for the online meeting URL if applicable. To exclude any row, add `reminders: false`.
5. Run **Actions → Schedule seminar reminders → Run workflow** to check its log. It sends only when today is exactly seven days before or the day of a confirmed event. For a safe email test, first create a temporary Kit account/audience or use a separate test segment before activating the real list.

The job runs daily at 07:17 UTC, roughly 08:17–09:17 in Italy depending on daylight saving time. Kit schedules a due broadcast for ten minutes after the job runs. GitHub scheduled jobs can be delayed or skipped; check the Actions and Kit Broadcasts screens before an event. The job searches existing Kit broadcasts by an event/date/time marker, so rerunning it will not intentionally create a duplicate. If you change a session's date or time after a reminder was scheduled, review the corresponding scheduled Kit broadcast manually. The outgoing content is captured when the reminder is created, so update important details before the relevant reminder date.

Preview decisions locally with `node tools/send_session_reminders.mjs`; this never calls Kit or sends an email. The production workflow runs the same script with `--send` and a GitHub Actions secret.
