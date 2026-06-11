import nodemailer from "nodemailer";

const ACCESS_CODE = "SKA2026";
const TO_EMAIL = "saimtraders57@gmail.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const { code, name, organisation, communication } = req.body || {};

  // Server-side access-code validation.
  if (code !== ACCESS_CODE) {
    return res.status(401).json({ ok: false, error: "Invalid access code." });
  }

  if (!name || !organisation || !communication) {
    return res.status(400).json({ ok: false, error: "All fields are required." });
  }

  const submittedAt = new Date().toLocaleString("en-GB", { timeZone: "Asia/Karachi" });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"SKA Diagnostic" <${process.env.GMAIL_USER}>`,
      to: TO_EMAIL,
      subject: `SKA Task Submission — ${name}`,
      html: `
        <div style="font-family: Roboto, Arial, sans-serif; color: #2E2B29; line-height: 1.6;">
          <h2 style="font-size:18px; margin:0 0 16px;">New Diagnostic Submission</h2>
          <table style="border-collapse: collapse;">
            <tr><td style="padding:6px 16px 6px 0; color:#9E8E7A; font-weight:700;">Name</td><td style="padding:6px 0;">${name}</td></tr>
            <tr><td style="padding:6px 16px 6px 0; color:#9E8E7A; font-weight:700;">Organisation</td><td style="padding:6px 0;">${organisation}</td></tr>
            <tr><td style="padding:6px 16px 6px 0; color:#9E8E7A; font-weight:700;">Communication</td><td style="padding:6px 0;">${communication}</td></tr>
            <tr><td style="padding:6px 16px 6px 0; color:#9E8E7A; font-weight:700;">Submitted</td><td style="padding:6px 0;">${submittedAt} (PKT)</td></tr>
          </table>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Email send failed:", err);
    return res.status(500).json({ ok: false, error: "Could not send. Please try again." });
  }
}
