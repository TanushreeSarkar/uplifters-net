const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { USER_ROLES } = require('../config/constants');

const router = express.Router();

router.get(
  '/dashboard',
  authMiddleware,
  roleMiddleware(USER_ROLES.ADMIN),
  adminController.getDashboardSummary
);

module.exports = router;

