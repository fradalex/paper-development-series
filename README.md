# Paper Development Series website

A static website for GitHub Pages. The rotating research question card is updated by GitHub Actions. It does not need an AI API key or paid model calls. The site uses a single page, an editable programme file, and automatic upcoming/archive grouping.

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

The workflow in `.github/workflows/research-pulse.yml` checks daily at **01:23 and 04:53 Europe/Rome** (primary and backup) and on site updates. These times stay aligned with Italian daylight saving and avoid the start of an hour, when GitHub reports higher scheduling load. It publishes a new set once the current issue is at least three days old. `research-questions.json` contains 90 editorially reviewed questions (30 per theme), with the papers and special-issue calls that informed each prompt. Three questions appear per issue, one from each theme. The rotation avoids repeating a question for 30 issues, about 90 days. `research-pulse.json` stores the current issue and 29 earlier issues. Visitors see the questions without paper links, and the workflow needs no API key or AI tokens.

The landing card shows one question at a time and advances every 12 seconds with a soft dissolve. Visitors can select a question or pause the rotation. Reduced-motion settings disable automatic transitions. The sources in the bank were reviewed on 27 September 2026. The questions are editorial prompts informed by recent literature, not claims that their topics have a measured trend ranking. Future issues rotate the reviewed pool; they do not conduct a new literature search automatically.

To revise the question pool, edit `research-questions.json`: update an entry's `question` and its `sources` IDs, or add entries and source records. Keep at least 30 distinct questions in each of the three `topics` lists and preserve the three topic names unless you also intend to change the rotation. Each source ID must exist in the `sources` object. Commit to `main`; a change to the bank triggers an immediate new issue and site deployment, even if the last issue is less than three days old. Subsequent issues follow the three-day cadence. The repository's **Settings → Pages** source must be **GitHub Actions**. To retry an overdue issue without changing the bank, open **Actions → Publish research pulse → Run workflow**.

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server 8000` from this folder and visit `http://localhost:8000/`.

## Project files

- `index.html`: page content and structure
- `styles.css`: responsive visual design
- `site-data.js`: organisers, contact details, and sessions
- `script.js`: automatic session display, rotating question card, and mobile navigation
- `research-questions.json`: reviewed question bank and literature references
- `research-pulse.json`: current research questions and archive
- `tools/update_research_pulse.py`: three-day rotation and no-repeat selection
- `.github/workflows/research-pulse.yml`: daily refresh check and Pages publication
- `favicon.svg`: browser icon
- `.nojekyll`: publish static files without Jekyll processing

The fonts use Google Fonts when available; Georgia and Arial serve as fallbacks. No visitor tracking or analytics are included.

## Automatic seminar emails through Kit

The `.github/workflows/session-reminders.yml` workflow reads `site-data.js` every day. A confirmed session with a date, speaker, title, and time gets one email seven calendar days before it and one on the event date. Dates follow Europe/Rome; the sender is `info@paperdevelopmentseries.org`. The template draws the title, speaker(s), affiliation(s), date, time, location, full description, and optional meeting link from the session entry. `TBD` entries and `reminders: false` entries are skipped.

**Audience:** Automated broadcasts target all active Kit subscribers. There is no test tag or one-person limit. Pending automated broadcasts are updated to this audience on the next successful sync; sent messages are never resent. New confirmed subscribers are eligible for future reminders without changing the code.

1. In Kit, ensure `info@paperdevelopmentseries.org` is a verified sending address and the domain authentication is complete. Ensure your own email is an **active** subscriber.
2. Import your subscribed contacts into Kit and check that their status is **Confirmed**. No tag is required.
3. In Kit **Settings → Developer → V4 Keys**, create a V4 API key and copy it. Never put it in a public file or chat.
4. In GitHub **Settings → Secrets and variables → Actions → New repository secret**, add it as `KIT_API_KEY`.
5. Open **Actions → Schedule seminar reminders → Run workflow**. Select **Verify setup** to test API access without scheduling email. You can also leave **Dry run** checked to preview reminders for today and the next seven days. Live runs synchronise the sending schedule automatically once configured.

### Scheduling and reliability

GitHub checks at **01:17 and 04:47 Europe/Rome**. The two overnight checks are separated by several hours and avoid the start of an hour, when GitHub reports higher scheduling load. The 01:23 and 04:53 research-pulse checks can also trigger a reminder recovery check when they run successfully on schedule. These are checks, not guaranteed GitHub start times. Scheduled Actions in this repository have arrived roughly five hours late. A valid cron configuration and a successful manual test do not prove that GitHub will start tomorrow's run on time.

To reduce this dependence, the script now **books reminders in Kit up to seven days ahead**, with a target send time of **10:00 Europe/Rome on each reminder date**. Kit can send a booked broadcast without GitHub running that morning. A missing reminder due today is queued about ten minutes after the recovery run; reminders for past dates are not sent retrospectively.

The workflow also runs automatically when you save changes to `site-data.js`, the reminder script/tests, or the reminder workflow on `main`. Successful **scheduled** research-pulse runs provide another recovery trigger. All reminder runs use the same concurrency group and check existing Kit broadcasts to avoid duplicates. This still depends on at least one GitHub run succeeding before the desired sending time; it is not a delivery guarantee.

When you edit the website's session data, pending reminders are updated on the next successful run. Moving/deleting a session or setting `reminders: false` unschedules its old pending broadcasts and retains them as drafts labelled `PDS cancelled`. Sent/sending messages cannot be changed. A message within one minute of its queued sending time is not rewritten; check Kit directly for urgent last-minute corrections. Keep the `PDS reminder | ...` descriptions intact because they identify automated broadcasts. Make routine edits in `site-data.js`; manual edits in Kit may be replaced by the next sync.

### If an expected email does not arrive

1. **Check Kit → Broadcasts first.** Find the seminar and look at its scheduled time or sent status. With advance scheduling, there need not be a GitHub run on the sending morning. If Kit shows sent, check the recipient's spam folder too.
2. If there is no scheduled broadcast, check `site-data.js`: `date` must be `YYYY-MM-DD`, speaker/title must be nonblank and not `TBD`, and `time` must be nonempty. `reminders: false` disables scheduling. Reminders are seven calendar days before and on the session date, using Europe/Rome.
3. In **Actions → Schedule seminar reminders**, open the latest run and **Synchronise reminders with Kit**. Logs show the planning date, broadcast IDs, target sending times, skips or errors. A successful **Verify setup** or **Preview** does not schedule email. The workflow requires the `KIT_API_KEY` secret; broadcasts target all active subscribers.
4. If no live run has succeeded, choose **Run workflow** on `main`, with **Dry run off** and **Verify setup off**. This books missing reminders for today and the next seven days. It checks Kit before creating anything. Confirm the actual matching broadcasts in Kit afterwards.
5. If no `schedule` runs appear, check that the workflow is enabled in Actions. Both workflows were active on 28 September 2026; the research-pulse runs from 27 September started at 16:00 and 16:49 Italy time, despite morning schedules. There was still no scheduled reminder run at the time of investigation. GitHub does not expose the exact cause of a missing trigger in the job log because no job started. If timing remains unreliable, use an external scheduler or GitHub Support; changing cron repeatedly does not establish a fix.
6. After removing or rescheduling a seminar, confirm the sync succeeded and its old pending broadcasts became drafts. If the sync fails, unschedule the obsolete broadcasts directly in Kit before their send times.

For research questions, open **Actions → Publish research pulse** and inspect the latest run's **Check for the next three-day issue** and **Save the new issue and archive** steps. Compare `research-pulse.json`'s `updated` date with today (UTC). The questions change only once at least three days have elapsed. Use **Run workflow** to retry an overdue update; then confirm the Pages **deploy** job succeeded.

Local preview: `node tools/send_session_reminders.mjs` makes no API calls and sends nothing. Tests: `node --test tools/send_session_reminders.test.mjs` use a mock Kit API and send nothing.

