const getTransporter = require('../config/email');
const logger = require('../config/logger');

const sendEmail = async ({ to, subject, html, text }) => {
  const transporter = getTransporter();

  if (!transporter) {
    logger.warn(`Email not sent (transporter missing). Intended to: ${to}`);
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.BREVO_FROM_EMAIL || 'no-reply@uplifters.net',
      to,
      subject,
      text,
      html,
    });
    logger.info(`Email sent to ${to}`);
  } catch (error) {
    logger.error(`Failed to send email: ${error.message}`);
  }
};

module.exports = {
  sendEmail,
};

