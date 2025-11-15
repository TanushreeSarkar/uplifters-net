const express = require('express');
const galleryController = require('../controllers/galleryController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../middleware/upload');
const { USER_ROLES } = require('../config/constants');

const router = express.Router();

router.get('/', galleryController.listGallery);
router.post('/', authMiddleware, upload.single('media'), galleryController.uploadGalleryItem);
router.get(
  '/pending/list',
  authMiddleware,
  roleMiddleware(USER_ROLES.ADMIN),
  galleryController.listPendingGallery
);
router.patch(
  '/:id',
  authMiddleware,
  roleMiddleware(USER_ROLES.ADMIN),
  galleryController.updateGalleryItem
);

module.exports = router;

