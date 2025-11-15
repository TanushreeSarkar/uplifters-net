const express = require('express');
const { body } = require('express-validator');
const donationController = require('../controllers/donationController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { USER_ROLES } = require('../config/constants');

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  [body('amount').isFloat({ gt: 0 }), body('currency').optional().isString()],
  validateRequest,
  donationController.createDonation
);

router.get('/me', authMiddleware, donationController.getMyDonations);

router.get('/', authMiddleware, roleMiddleware(USER_ROLES.ADMIN), donationController.listDonations);
router.get('/:id', authMiddleware, roleMiddleware(USER_ROLES.ADMIN), donationController.getDonationById);
router.patch(
  '/:id/status',
  authMiddleware,
  roleMiddleware(USER_ROLES.ADMIN),
  donationController.updateDonationStatus
);

module.exports = router;

