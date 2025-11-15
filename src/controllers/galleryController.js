const GalleryItem = require('../models/GalleryItem');
const asyncHandler = require('../middleware/asyncHandler');
const sendResponse = require('../utils/response');
const ApiError = require('../utils/ApiError');
const { MEDIA_STATUS } = require('../config/constants');

const listGallery = asyncHandler(async (req, res) => {
  const gallery = await GalleryItem.find({ status: MEDIA_STATUS.APPROVED })
    .sort({ createdAt: -1 })
    .limit(Number(req.query.limit) || 30);
  return sendResponse(res, 200, 'Gallery fetched', gallery);
});

const uploadGalleryItem = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'File required');

  const item = await GalleryItem.create({
    title: req.body.title,
    description: req.body.description,
    mediaUrl: req.file.path,
    publicId: req.file.filename,
    tags: req.body.tags?.split(',').map((t) => t.trim()),
    submittedBy: req.user?._id,
    status: req.user?.role === 'admin' ? MEDIA_STATUS.APPROVED : MEDIA_STATUS.PENDING,
  });

  return sendResponse(res, 201, 'Gallery item uploaded', item);
});

const listPendingGallery = asyncHandler(async (req, res) => {
  const items = await GalleryItem.find({ status: { $ne: MEDIA_STATUS.APPROVED } });
  return sendResponse(res, 200, 'Pending gallery items', items);
});

const updateGalleryItem = asyncHandler(async (req, res) => {
  const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) throw new ApiError(404, 'Gallery item not found');
  return sendResponse(res, 200, 'Gallery item updated', item);
});

module.exports = {
  listGallery,
  uploadGalleryItem,
  listPendingGallery,
  updateGalleryItem,
};

