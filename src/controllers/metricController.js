const ImpactMetric = require('../models/ImpactMetric');
const asyncHandler = require('../middleware/asyncHandler');
const sendResponse = require('../utils/response');
const ApiError = require('../utils/ApiError');
const { getSummaryMetrics } = require('../services/metricsService');

const getPublicMetrics = asyncHandler(async (req, res) => {
  const summary = await getSummaryMetrics();
  return sendResponse(res, 200, 'Metrics fetched', summary);
});

const upsertMetric = asyncHandler(async (req, res) => {
  const metric = await ImpactMetric.findOneAndUpdate(
    { type: req.body.type },
    { ...req.body, lastUpdated: new Date() },
    { upsert: true, new: true }
  );
  return sendResponse(res, 200, 'Metric updated', metric);
});

const deleteMetric = asyncHandler(async (req, res) => {
  const metric = await ImpactMetric.findByIdAndDelete(req.params.id);
  if (!metric) throw new ApiError(404, 'Metric not found');
  return sendResponse(res, 200, 'Metric deleted');
});

module.exports = {
  getPublicMetrics,
  upsertMetric,
  deleteMetric,
};

