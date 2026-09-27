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

The workflow in `.github/workflows/research-pulse.yml` checks daily at 08:17 and 09:41 UTC and also on site updates. Once the current issue is at least three days old, it consults recent OpenAlex and Crossref metadata and chooses three discussion questions from a curated bank of 24 questions per topic. It saves the new issue and up to 23 earlier issues in `research-pulse.json`, then republishes the site. Visitors see questions without article links. The site uses no AI API key or model tokens.

The landing card shows one question at a time and advances every 12 seconds with a soft dissolve. Visitors can select a question or pause the rotation. Reduced-motion settings disable automatic transitions. If the literature sources are unavailable, the three-day refresh still selects questions from the curated bank. These are discussion prompts, not measured claims about which topics are statistically trending.

To refresh immediately, open **Actions → Publish research pulse → Run workflow**. The repository's **Settings → Pages** source must be **GitHub Actions** for scheduled updates to publish.

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server 8000` from this folder and visit `http://localhost:8000/`.

## Project files

- `index.html`: page content and structure
- `styles.css`: responsive visual design
- `site-data.js`: organisers, contact details, and sessions
- `script.js`: automatic session display, rotating question card, and mobile navigation
- `research-pulse.json`: current research questions and archive
- `tools/update_research_pulse.py`: three-day literature scan and question selection
- `.github/workflows/research-pulse.yml`: daily refresh check and Pages publication
- `favicon.svg`: browser icon
- `.nojekyll`: publish static files without Jekyll processing

The fonts use Google Fonts when available; Georgia and Arial serve as fallbacks. No visitor tracking or analytics are included.

## Automatic seminar emails through Kit

The `.github/workflows/session-reminders.yml` workflow reads `site-data.js` every day. A confirmed session with a date, speaker, title, and time gets one email seven calendar days before it and one on the event date. Dates follow Europe/Rome; the sender is `info@paperdevelopmentseries.org`. The template draws the title, speaker(s), affiliation(s), date, time, location, full description, and optional meeting link from the session entry. `TBD` entries and `reminders: false` entries are skipped.

**One-person pilot:** To keep the test restricted to one recipient even if someone joins through the public signup form, the workflow currently targets only a Kit tag named exactly `PDS test`. It checks that this tag exists and has exactly one subscriber before it schedules any broadcasts. It does not use the whole mailing list during this pilot. When the test ends, explicitly change this targeting before mailing everyone.

1. In Kit, ensure `info@paperdevelopmentseries.org` is a verified sending address and the domain authentication is complete. Ensure your own email is an **active** subscriber.
2. Create a Kit tag called **PDS test** and apply it to your subscriber record only. Check its count is 1.
3. In Kit **Settings → Developer → V4 Keys**, create a V4 API key and copy it. Never put it in a public file or chat.
4. In GitHub **Settings → Secrets and variables → Actions → New repository secret**, add it as `KIT_API_KEY`.
5. Open **Actions → Schedule seminar reminders → Run workflow**. Select **Verify setup** to test API access and tag count without scheduling email. You can also leave **Dry run** checked to preview reminders due on the current day. The daily scheduled run sends automatically once configured.

The job is scheduled daily at **10:00 a.m. Europe/Rome**, with a backup at **10:30 a.m. Europe/Rome**. This follows Italian daylight-saving time. Kit schedules due emails about ten minutes after the job actually starts. GitHub may delay or drop scheduled triggers, so these are target times rather than guaranteed delivery times. Both runs check Kit for an existing event/date/time reminder before creating a broadcast. If you change an event's date or time after scheduling, review the older broadcast in Kit manually. The week's email uses the session details on its reminder date; the day-of email reads them again on the event date.

### If an expected email does not arrive

1. Check the date in `site-data.js`: a confirmed entry needs `date` in `YYYY-MM-DD` format, a non-`TBD` speaker and title, and a nonempty `time`. `reminders: false` disables it. A message is due only **seven calendar days before** the session or **on its date** in Europe/Rome.
2. Open **GitHub → Actions → Schedule seminar reminders**. Look for a run whose event is **schedule** on the expected date, around 10:00 or 10:30 a.m. A green manual run from a previous day does not establish that the automatic trigger worked. GitHub schedules can start late.
3. Open the run, select **reminders**, and expand **Schedule due reminders through Kit**. Look for `scheduled in Kit as broadcast …`, `already exists in Kit; skipping`, `no confirmed sessions due`, or an error. If the run failed, inspect the error before retrying. The current one-person pilot requires `KIT_API_KEY` and exactly one subscriber in the **PDS test** tag.
4. In Kit, check **Broadcasts** for the matching subject and scheduled/sent status. If Kit shows it as sent, check the subscribed mailbox's inbox and spam folders. If Kit has no broadcast and GitHub has no run by late morning, start **Actions → Schedule seminar reminders → Run workflow** with **Dry run off** and **Verify setup off**. The live run schedules due reminders; a dry run only previews them. The script checks Kit for an existing reminder before scheduling another.
5. If a broadcast exists but contains an old time, link, or title, edit or cancel that broadcast in Kit. Changing `site-data.js` does not rewrite an email already scheduled there.

For research questions, open **Actions → Publish research pulse** and inspect the latest run's **Check for the next three-day issue** and **Save the new issue and archive** steps. Compare `research-pulse.json`'s `updated` date with today (UTC). The questions change only once at least three days have elapsed. Use **Run workflow** to retry an overdue update; then confirm the Pages **deploy** job succeeded.

Local preview: `node tools/send_session_reminders.mjs` makes no API calls and sends nothing.
