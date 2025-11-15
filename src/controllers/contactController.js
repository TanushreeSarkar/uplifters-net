const ContactSubmission = require('../models/ContactSubmission');
const asyncHandler = require('../middleware/asyncHandler');
const sendResponse = require('../utils/response');
const { sendEmail } = require('../services/emailService');
const ApiError = require('../utils/ApiError');

const submitContactForm = asyncHandler(async (req, res) => {
  const submission = await ContactSubmission.create(req.body);

  await sendEmail({
    to: process.env.SUPPORT_EMAIL || 'support@uplifters.net',
    subject: `[Contact] ${submission.subject}`,
    html: `<p>${submission.message}</p><p>From: ${submission.name} (${submission.email})</p>`,
  });

  return sendResponse(res, 201, 'Message received. We will respond soon.', submission);
});

const listContacts = asyncHandler(async (req, res) => {
  const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
  return sendResponse(res, 200, 'Contact submissions fetched', submissions);
});

const updateContactStatus = asyncHandler(async (req, res) => {
  const contact = await ContactSubmission.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!contact) {
    throw new ApiError(404, 'Submission not found');
  }
  return sendResponse(res, 200, 'Contact updated', contact);
});

module.exports = {
  submitContactForm,
  listContacts,
  updateContactStatus,
};

