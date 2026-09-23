# Paper Development Series website

A free, static website for GitHub Pages. No paid domain, build tool, package installation, or ongoing subscription is required. The site uses a single page, an editable programme file, and automatic upcoming/archive grouping.

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
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/(root)`. Save.
4. The address will be `https://ACCOUNT.github.io/paper-development-series/` (replace `ACCOUNT` with your username or organisation name). GitHub may take several minutes to publish the first time.
5. To update a session, open `site-data.js` on GitHub, click the pencil icon, edit it, and commit the change to `main`. The website will republish automatically. Give other organisers repository access under **Settings → Collaborators and teams** (the exact menu name depends on account type).

For a shorter `https://ACCOUNT.github.io/` address, name the repository exactly `ACCOUNT.github.io` instead. The included relative links work with either repository name.

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server 8000` from this folder and visit `http://localhost:8000/`.

## Project files

- `index.html`: page content and structure
- `styles.css`: responsive visual design
- `site-data.js`: organisers, contact details, and sessions
- `script.js`: automatic session display and mobile navigation
- `favicon.svg`: browser icon
- `.nojekyll`: publish static files without Jekyll processing

The fonts use Google Fonts when available; Georgia and Arial serve as fallbacks. No visitor tracking or analytics are included.
