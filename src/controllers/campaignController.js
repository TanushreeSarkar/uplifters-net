const Campaign = require('../models/Campaign');
const asyncHandler = require('../middleware/asyncHandler');
const sendResponse = require('../utils/response');
const ApiError = require('../utils/ApiError');

const listCampaigns = asyncHandler(async (req, res) => {
  const campaigns = await Campaign.find({ status: { $ne: 'archived' } }).sort({ createdAt: -1 });
  return sendResponse(res, 200, 'Campaigns fetched', campaigns);
});

const getCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findOne({ slug: req.params.slug });
  if (!campaign) throw new ApiError(404, 'Campaign not found');
  return sendResponse(res, 200, 'Campaign fetched', campaign);
});

const createCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.create({
    ...req.body,
    createdBy: req.user._id,
  });
  return sendResponse(res, 201, 'Campaign created', campaign);
});

const updateCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!campaign) throw new ApiError(404, 'Campaign not found');
  return sendResponse(res, 200, 'Campaign updated', campaign);
});

const deleteCampaign = asyncHandler(async (req, res) => {
  await Campaign.findByIdAndDelete(req.params.id);
  return sendResponse(res, 200, 'Campaign deleted');
});

module.exports = {
  listCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign,
};

