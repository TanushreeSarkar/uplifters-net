const mongoose = require('mongoose');
const { MEDIA_STATUS } = require('../config/constants');

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    mediaUrl: { type: String, required: true },
    publicId: String,
    tags: [{ type: String }],
    status: {
      type: String,
      enum: Object.values(MEDIA_STATUS),
      default: MEDIA_STATUS.PENDING,
    },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);

module.exports = GalleryItem;

