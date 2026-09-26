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

To add a person, copy a row before the closing `],`; to remove one, delete their row. Keep the comma after each row and quotation marks around text. Use **Add file → Upload files** in the repository to upload portraits beside `index.html`, then enter the exact filename in `photo`. Leave `photo: ""` to display the built-in portrait placeholder. A portrait cropped near 3:4 works best. Leave `bio: ""` to show “Biography to follow.” Click **Commit changes** on GitHub; the carousel and bio cards will update on the published site. Names appear in the order listed. The carousel advances every nine seconds and pauses while someone interacts with it.

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
