const express = require('express');
const { body } = require('express-validator');
const contactController = require('../controllers/contactController');
const validateRequest = require('../middleware/validateRequest');
const { contactLimiter } = require('../middleware/rateLimiter');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { USER_ROLES } = require('../config/constants');

const router = express.Router();

router.post(
  '/',
  contactLimiter,
  [body('name').notEmpty(), body('email').isEmail(), body('subject').notEmpty(), body('message').notEmpty()],
  validateRequest,
  contactController.submitContactForm
);

router.get('/', authMiddleware, roleMiddleware(USER_ROLES.ADMIN), contactController.listContacts);
router.patch(
  '/:id',
  authMiddleware,
  roleMiddleware(USER_ROLES.ADMIN),
  contactController.updateContactStatus
);

module.exports = router;

