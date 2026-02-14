/**
 * Notification recipient constants for MellyCrochets.
 * Override via env: OWNER_EMAIL, OWNER_WHATSAPP.
 */
const OWNER_EMAIL = process.env.OWNER_EMAIL || "mellycrochets25@gmail.com";
const OWNER_WHATSAPP = process.env.OWNER_WHATSAPP || "237681077051";

module.exports = {
  OWNER_EMAIL,
  OWNER_WHATSAPP,
};
