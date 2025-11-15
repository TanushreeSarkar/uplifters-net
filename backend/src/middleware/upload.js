const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'uplifters-net',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'mp4'],
    resource_type: file.mimetype.includes('video') ? 'video' : 'image',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  }),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;

