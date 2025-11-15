const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');
const asyncHandler = require('../middleware/asyncHandler');
const sendResponse = require('../utils/response');
const ApiError = require('../utils/ApiError');
const { sendEmail } = require('../services/emailService');

const createDonation = asyncHandler(async (req, res) => {
  const { amount, currency, campaignId, paymentMethod } = req.body;

  const donation = await Donation.create({
    user: req.user?._id,
    name: req.body.name || `${req.user.firstName} ${req.user.lastName}`,
    email: req.body.email || req.user.email,
    amount,
    currency,
    campaign: campaignId,
    status: paymentMethod === 'bank_transfer' ? 'pending' : 'confirmed',
    paymentMethod,
    metadata: req.body.metadata,
  });

  if (campaignId) {
    await Campaign.findByIdAndUpdate(campaignId, { $inc: { raisedAmount: amount } });
  }

  sendEmail({
    to: donation.email,
    subject: 'Donation receipt',
    html: `<p>Thank you for donating ${donation.amount} ${donation.currency}.</p>`,
  });

  return sendResponse(res, 201, 'Donation recorded', donation);
});

const getMyDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find({ user: req.user._id }).sort({ createdAt: -1 });
  return sendResponse(res, 200, 'Donations fetched', donations);
});

const listDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find()
    .populate('user', 'firstName lastName email')
    .populate('campaign', 'title');
  return sendResponse(res, 200, 'All donations fetched', donations);
});

const getDonationById = asyncHandler(async (req, res) => {
  const donation = await Donation.findById(req.params.id)
    .populate('user', 'firstName lastName email')
    .populate('campaign', 'title');
  if (!donation) throw new ApiError(404, 'Donation not found');
  return sendResponse(res, 200, 'Donation fetched', donation);
});

const updateDonationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const donation = await Donation.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  if (!donation) throw new ApiError(404, 'Donation not found');

  return sendResponse(res, 200, 'Donation status updated', donation);
});

module.exports = {
  createDonation,
  getMyDonations,
  listDonations,
  getDonationById,
  updateDonationStatus,
};

