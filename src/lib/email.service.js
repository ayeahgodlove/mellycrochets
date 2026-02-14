/**
 * Email service using Nodemailer (SMTP).
 * Set in .env: SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM (optional).
 * For Gmail: use App Password, SMTP_HOST=smtp.gmail.com, SMTP_PORT=587, SMTP_SECURE=false.
 */
const nodemailer = require("nodemailer");

function trimEnv(key) {
  const v = process.env[key];
  return typeof v === "string" ? v.trim() : v;
}

const MAIL_FROM = trimEnv("MAIL_FROM") || trimEnv("SMTP_USER") || "noreply@mellycrochets.shop";

function getTransporter() {
  const host = trimEnv("SMTP_HOST");
  const user = trimEnv("SMTP_USER");
  const pass = trimEnv("SMTP_PASS");
  if (!host || !user || !pass) {
    return null;
  }
  return nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
}

/**
 * Send an email.
 * @param {object} options - { to, subject, text, html }
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
async function sendEmail(options) {
  const { to, subject, text, html } = options;
  console.log(options);
  if (!to || !subject) {
    return { success: false, error: "Missing to or subject" };
  }
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[email] SMTP not configured (SMTP_HOST, SMTP_USER, SMTP_PASS). Skip send.");
    return { success: false, error: "Email not configured" };
  }
  try {
    await transporter.sendMail({
      from: MAIL_FROM,
      to,
      subject,
      text: text || (html ? html.replace(/<[^>]*>/g, "") : ""),
      html: html || undefined,
    });
    return { success: true };
  } catch (err) {
    const msg = err.message || "";
    if (msg.includes("Invalid login") || msg.includes("535") || msg.includes("BadCredentials")) {
      console.error("[email] Send failed: Gmail rejected login. Use an App Password (not your normal password): https://support.google.com/accounts/answer/185833. Check SMTP_USER (full email) and SMTP_PASS in .env.");
    } else {
      console.error("[email] Send failed:", msg);
    }
    return { success: false, error: err.message };
  }
}

module.exports = { sendEmail, getTransporter };
