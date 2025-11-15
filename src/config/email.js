const nodemailer = require('nodemailer');
const logger = require('./logger');

let transporter;

const getTransporter = () => {
  if (transporter) return transporter;

  const { BREVO_API_KEY, BREVO_SMTP_HOST, BREVO_SMTP_PORT } = process.env;

  if (!BREVO_API_KEY) {
    logger.warn('Brevo API key missing. Email sending disabled.');
    return null;
  }

  transporter = nodemailer.createTransport({
    host: BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
    port: Number(BREVO_SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_USER || 'apikey',
      pass: BREVO_API_KEY,
    },
  });

  return transporter;
};

module.exports = getTransporter;

