# SKA Diagnostic — Application Task

A minimal access-code protected form with an email-delivery backend.

## What it does
1. Access-code gate — correct code is `SKA2026`; a wrong code shows an error.
2. Correct code reveals a form: Name, Organisation, and one multiple-choice question.
3. On submit, responses are emailed to `hello@sarahkhan.co` with subject `SKA Task Submission — [Name]`.

## Stack & decisions
- Static HTML + vanilla JS front-end — no framework. Lightweight over impressive.
- Vercel serverless function (`/api/submit`) for the backend.
- Nodemailer + Gmail for delivery.
- Access code is validated **server-side**, not just in the browser — the front-end gate is for UX only.
- Page matches SKA's existing brand palette and Roboto typography.

## Deploy
Set two environment variables in Vercel:
- `GMAIL_USER` — your Gmail address
- `GMAIL_APP_PASSWORD` — a Google App Password (requires 2-Step Verification)
