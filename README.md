# Paper Development Series website

A static website for GitHub Pages. The weekly research card is built remotely in GitHub Actions. AI drafting is optional and requires a separately billed OpenAI API key. The site uses a single page, an editable programme file, and automatic upcoming/archive grouping.

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

## Publish on GitHub Pages

1. Create a free GitHub account or an organisation account shared by the organisers. A dedicated organisation makes handover easier.
2. Create a **public** repository called `paper-development-series` and upload the contents of this folder to the repository root. Upload the files themselves, not the enclosing folder or ZIP. The file `index.html` must be at the root. Keep `.nojekyll` if your upload method includes hidden files.
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **GitHub Actions** as the source. Save. The `Publish research pulse` workflow now publishes both site edits and scheduled research updates.
4. The address will be `https://ACCOUNT.github.io/paper-development-series/` (replace `ACCOUNT` with your username or organisation name). GitHub may take several minutes to publish the first time.
5. To update a session, open `site-data.js` on GitHub, click the pencil icon, edit it, and commit the change to `main`. The website will republish automatically through the same workflow. Give other organisers repository access under **Settings → Collaborators and teams** (the exact menu name depends on account type).

For a shorter `https://ACCOUNT.github.io/` address, name the repository exactly `ACCOUNT.github.io` instead. The included relative links work with either repository name.

## Automatic research pulse

The workflow in `.github/workflows/research-pulse.yml` runs every Tuesday at 08:17 UTC, and you can start it at any time under **Actions → Publish research pulse → Run workflow**. It queries recent articles from OpenAlex and Crossref, keeps source links, and publishes three discussion questions. The issue is archived in `research-pulse.json` (up to 12 previous issues). A failed literature query keeps the last published issue. Visitors only download the published JSON; they never call a model.

With no additional setup the prompts are generated automatically from a small fixed set of topic questions and freshly retrieved papers. To enable **AI-written** questions, create an OpenAI API key with its own billing account, then put it in **Settings → Secrets and variables → Actions → New repository secret** under exactly `OPENAI_API_KEY`. Do not paste the key into repository files. The script makes at most one AI request per scheduled run; if the model call fails, it publishes the source-linked prompts. Model usage is billed by OpenAI separately from ChatGPT. If you want a higher OpenAlex query allowance, optionally add a free `OPENALEX_API_KEY` repository secret. The keyless OpenAlex endpoint and Crossref are the default sources.

After switching the Pages source to GitHub Actions, run the workflow once to publish the first dated issue. Future scheduled runs deploy automatically. The questions are **discussion prompts drawn from recent papers**, not claims that a topic is statistically trending across all research. The references are research leads and should be read before citing findings. Repository owners can turn the workflow off from Actions if desired.

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server 8000` from this folder and visit `http://localhost:8000/`.

## Project files

- `index.html`: page content and structure
- `styles.css`: responsive visual design
- `site-data.js`: organisers, contact details, and sessions
- `script.js`: automatic session display, research card, and mobile navigation
- `research-pulse.json`: current research questions and archive
- `tools/update_research_pulse.py`: weekly literature retrieval and question drafting
- `.github/workflows/research-pulse.yml`: weekly refresh and Pages publication
- `favicon.svg`: browser icon
- `.nojekyll`: publish static files without Jekyll processing

The fonts use Google Fonts when available; Georgia and Arial serve as fallbacks. No visitor tracking or analytics are included.
