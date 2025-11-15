const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const validateRequest = require('../middleware/validateRequest');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post(
  '/register',
  authLimiter,
  [
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  validateRequest,
  authController.register
);

router.post(
  '/login',
  authLimiter,
  [body('email').isEmail(), body('password').notEmpty()],
  validateRequest,
  authController.login
);

router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);
router.post('/forgot-password', [body('email').isEmail()], validateRequest, authController.forgotPassword);
router.post(
  '/reset-password',
  [body('token').notEmpty(), body('password').isLength({ min: 6 })],
  validateRequest,
  authController.resetPassword
);

module.exports = router;

