const Testimonial = require('../models/Testimonial');
const asyncHandler = require('../middleware/asyncHandler');
const sendResponse = require('../utils/response');
const ApiError = require('../utils/ApiError');
const { TESTIMONIAL_STATUS } = require('../config/constants');

const listPublicTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({ status: TESTIMONIAL_STATUS.APPROVED })
    .sort({ createdAt: -1 })
    .limit(Number(req.query.limit) || 20);
  return sendResponse(res, 200, 'Testimonials fetched', testimonials);
});

const submitTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create({
    user: req.user?._id,
    name: req.body.name || `${req.user.firstName} ${req.user.lastName}`,
    content: req.body.content,
    rating: req.body.rating,
  });
  return sendResponse(res, 201, 'Testimonial submitted', testimonial);
});

const reviewTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({ status: { $ne: TESTIMONIAL_STATUS.APPROVED } });
  return sendResponse(res, 200, 'Pending testimonials', testimonials);
});

const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!testimonial) throw new ApiError(404, 'Testimonial not found');
  return sendResponse(res, 200, 'Testimonial updated', testimonial);
});

module.exports = {
  listPublicTestimonials,
  submitTestimonial,
  reviewTestimonials,
  updateTestimonial,
};

