/**
 * WhatsApp service using Twilio.
 * Set in .env: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM (e.g. whatsapp:+14155238886 for sandbox).
 * Recipient numbers should be in E.164 (e.g. 237681077051).
 */

function trimEnv(key) {
  const v = process.env[key];
  return typeof v === "string" ? v.trim() : v;
}

function getTwilioClient() {
  const accountSid = trimEnv("TWILIO_ACCOUNT_SID");
  const authToken = trimEnv("TWILIO_AUTH_TOKEN");
  if (!accountSid || !authToken) return null;
  try {
    return require("twilio")(accountSid, authToken);
  } catch (e) {
    return null;
  }
}

/**
 * Send a WhatsApp message.
 * @param {string} to - E.164 number without + (e.g. 237681077051)
 * @param {string} body - Message text
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
async function sendWhatsApp(to, body) {
  if (!to || !body) {
    return { success: false, error: "Missing to or body" };
  }
  const fromRaw = trimEnv("TWILIO_WHATSAPP_FROM");
  if (!fromRaw) {
    console.warn("[whatsapp] TWILIO_WHATSAPP_FROM not set. Skip send.");
    return { success: false, error: "WhatsApp not configured" };
  }
  const from = fromRaw.startsWith("whatsapp:") ? fromRaw : `whatsapp:${fromRaw.replace(/\D/g, "")}`;
  const client = getTwilioClient();
  if (!client) {
    console.warn("[whatsapp] Twilio credentials not set. Skip send.");
    return { success: false, error: "WhatsApp not configured" };
  }
  const toFormatted = to.replace(/\D/g, "");
  if (!toFormatted.length) {
    return { success: false, error: "Invalid recipient number" };
  }
  try {
    await client.messages.create({
      body,
      from,
      to: `whatsapp:${toFormatted}`,
    });
    return { success: true };
  } catch (err) {
    const msg = err.message || "";
    if (msg.includes("could not find a Channel") || msg.includes("From address")) {
      console.error("[whatsapp] Send failed: Invalid TWILIO_WHATSAPP_FROM. Use the exact sender from Twilio: Console → Messaging → Try it out → WhatsApp. Sandbox format: whatsapp:+14155238886");
    } else {
      console.error("[whatsapp] Send failed:", msg);
    }
    return { success: false, error: err.message };
  }
}

module.exports = { sendWhatsApp, getTwilioClient };
