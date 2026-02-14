/**
 * High-level notification helpers: contact form → owner; order status → customer.
 */
const { sendEmail } = require("./email.service");
const { sendWhatsApp } = require("./whatsapp.service");
const { OWNER_EMAIL, OWNER_WHATSAPP } = require("./notify-constants");

/**
 * Contact form submission:
 * - Email TO owner (OWNER_EMAIL): full contact details.
 * - Email TO contact (form email): acknowledgment.
 * - WhatsApp TO owner (OWNER_WHATSAPP): full contact details.
 * - WhatsApp TO contact (form phone): acknowledgment; recipient = contact's phone from form.
 */
async function notifyOwnerContact(contact) {
  const { name, email, phone, message } = contact;
  const phoneLine = phone ? `\nPhone: ${phone}` : "";
  const subjectToOwner = `[MellyCrochets] New contact from ${name}`;
  const textToOwner = `Name: ${name}\nEmail: ${email}${phoneLine}\n\nMessage:\n${message}`;
  const htmlToOwner = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;

  const subjectToContact = "We received your message – MellyCrochets";
  const textToContact = `Hi ${name}! We've received your message and will get back to you soon. Thank you for reaching out. – MellyCrochets`;
  const htmlToContact = `<p>Hi ${escapeHtml(name)}!</p><p>We've received your message and will get back to you soon. Thank you for reaching out.</p><p>— MellyCrochets</p>`;

  const whatsappToOwner = `*MellyCrochets – New contact*\n\n*Name:* ${name}\n*Email:* ${email}${phone ? `\n*Phone:* ${phone}` : ""}\n\n*Message:*\n${message}`;
  const acknowledgmentToContact = `*MellyCrochets* – Hi ${name}! We've received your message and will get back to you soon. Thank you for reaching out.`;

  const promises = [
    sendEmail({ to: OWNER_EMAIL, subject: subjectToOwner, text: textToOwner, html: htmlToOwner }),
    sendEmail({ to: email, subject: subjectToContact, text: textToContact, html: htmlToContact }),
    sendWhatsApp(OWNER_WHATSAPP, whatsappToOwner),
  ];
  const contactPhoneDigits = phone ? phone.replace(/\D/g, "").replace(/^0+/, "") : "";
  if (contactPhoneDigits.length >= 9) {
    const recipientPhone = contactPhoneDigits.length === 9 && /^[26]/.test(contactPhoneDigits)
      ? `237${contactPhoneDigits}`
      : contactPhoneDigits;
    promises.push(sendWhatsApp(recipientPhone, acknowledgmentToContact));
  }

  const results = await Promise.all(promises);
  return {
    emailToOwner: results[0],
    emailToContact: results[1],
    whatsappToOwner: results[2],
    whatsappToContact: results[3] || null,
  };
}

/**
 * Notify customer about order status (completed or failed).
 * Sends email and WhatsApp to the customer.
 */
async function notifyCustomerOrderStatus({ email, telephone, orderNo, status, orderId }) {
  const isSuccess = status === "completed" || status === "PAID" || status === "paid";
  const subject = isSuccess
    ? `Order ${orderNo} confirmed – MellyCrochets`
    : `Order ${orderNo} – payment issue – MellyCrochets`;
  const statusLabel = isSuccess ? "confirmed" : "payment was not completed";

  const text = isSuccess
    ? `Your order ${orderNo} has been confirmed. We'll process it and keep you updated. Thank you for shopping with MellyCrochets!`
    : `We couldn't complete the payment for order ${orderNo}. Please try again or contact us for help. MellyCrochets`;

  const html = isSuccess
    ? `
    <h2>Order confirmed</h2>
    <p>Hello,</p>
    <p>Your order <strong>${escapeHtml(orderNo)}</strong> has been confirmed. We'll process it and keep you updated.</p>
    <p>Thank you for shopping with MellyCrochets!</p>
    `
    : `
    <h2>Payment issue</h2>
    <p>Hello,</p>
    <p>The payment for order <strong>${escapeHtml(orderNo)}</strong> was not completed. Please try again or contact us for help.</p>
    <p>— MellyCrochets</p>
    `;

  const whatsappBody = isSuccess
    ? `*MellyCrochets* – Your order *${orderNo}* has been confirmed. We'll process it and keep you updated. Thank you!`
    : `*MellyCrochets* – Payment for order *${orderNo}* was not completed. Please try again or contact us.`;

  const promises = [];
  if (email) {
    promises.push(sendEmail({ to: email, subject, text, html }));
  }
  if (telephone) {
    const tel = telephone.replace(/\D/g, "");
    if (tel.length) promises.push(sendWhatsApp(tel, whatsappBody));
  }

  const results = await Promise.all(promises);
  return {
    email: results[0] || { success: false, error: "No email" },
    whatsapp: results[1] || { success: false, error: "No telephone" },
  };
}

function escapeHtml(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

module.exports = {
  notifyOwnerContact,
  notifyCustomerOrderStatus,
};
