# Connect the mailing list with Google Forms

The website's Mailing list section is prepared but should stay unpublished until the signup form below is connected. Subscriber addresses will live in a private Google Sheet, not in the public GitHub repository.

1. Sign in to [Google Forms](https://forms.google.com/) with paperdevelopmentseries@gmail.com and create a blank form called **Paper Development Series — mailing list**.
2. In **Settings > Responses**, set **Collect email addresses** to **Responder input**, so participants can enter an address without a Google Account. Do not enable **Limit to 1 response**, which would require Google sign-in. Do not enable **View results summary**, which could reveal responses to participants.
3. Add a required checkbox question: **I agree to receive Paper Development Series email reminders one week before each session and on the day of the session. I can unsubscribe at any time by emailing paperdevelopmentseries@gmail.com.** Use the option **I agree**. Add a brief description that addresses will only be used for these reminders.
4. In **Responses**, click **Link to Sheets** and create a new spreadsheet. Keep the spreadsheet private. This is where you can view, export, and later remove addresses. Since a person can submit twice, any future sender should deduplicate email addresses.
5. **Publish** the form, with general responder access set to anyone with the link. Under **More > Embed HTML**, copy the iframe code. Extract only the HTTPS URL between `src="` and the next `"`.
6. Paste that URL into `mailingListFormUrl` in `site-data.js`. Test a subscription from the website and confirm that the response appears in the linked Sheet. Then merge and publish the draft pull request.

Google Forms and Sheets collect the list; they do not send the planned one-week and same-day reminders. A later Google Apps Script can read the Sheet and scheduled sessions, send the emails, and respect removals. Its sending quota for a personal Gmail account is currently 100 recipients per day. No API key belongs in the public repository.
