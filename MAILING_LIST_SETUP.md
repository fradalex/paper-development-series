# Mailing list

The mailing list section embeds the published Paper Development Series Kit form. Subscribers are stored in Kit, not in the website's public repository.

## Managing the signup form

- In Kit, open Audience growth > Landing Pages & Forms > Paper Development Series mailing list. You can edit the form there without changing website code. Keep the confirmation email on and "Auto-confirm new subscribers" off if you want double opt-in.
- To check signups, open Kit > Subscribers. To replace the form entirely, publish the replacement and update the Kit embed script in `index.html`.
- Test one signup with an address you control. Follow the confirmation email and check that the subscriber appears in Kit.

## Scheduled reminders

The website currently collects subscribers but does **not** send seminar reminders. Before announcing them as operational, build and test a scheduled workflow that reads confirmed sessions from `site-data.js`, sends one message seven days before and one on the event day in Europe/Rome, skips TBD sessions, and prevents duplicate sends. The messages should include the date, time, speaker, title, and meeting link when available.

The Kit API key must be stored as a private GitHub Actions secret (never in a website file or a chat message). Scheduled GitHub Actions can be disabled after 60 days without repository activity; account for this before enabling unattended sends.
