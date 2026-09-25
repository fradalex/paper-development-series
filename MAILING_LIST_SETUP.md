# Connect the mailing list

The website's Mailing list section is prepared but should stay unpublished until the subscription form below is connected. No email addresses are stored in the website or its public GitHub repository.

1. Create a free account at https://www.brevo.com/ using paperdevelopmentseries@gmail.com. Brevo's free plan stores contacts and includes 300 email sends per day.
2. Under CRM > Contacts > Lists, create a list named **Paper Development Series — seminar reminders**.
3. In Marketing > Forms > Sign-up, create a **Full page/embedded** form. Ask only for an email address. Enable the GDPR fields and describe the subscription as reminders for Paper Development Series sessions; use **Double confirmation email**. Select the list from step 2 as the destination. Use Brevo's default confirmation email unless you customize it.
4. At the **Share** step, copy the **Iframe** code. Extract only the HTTPS URL inside its `src="..."` attribute; do not paste the full HTML into site-data.js.
5. Paste that URL into `mailingListFormUrl` in `site-data.js`. The website will embed the Brevo-hosted form; contacts who confirm their addresses appear in Brevo under **CRM > Contacts > Lists**.
6. Send a personal test subscription, click the confirmation link received by email, and check that the address appears in the list. Then merge and publish the draft pull request.

The scheduled reminders one week before and on the day of a session are a later task. Do not add an API key to the public repository.
