const express = require('express');
const testimonialController = require('../controllers/testimonialController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { USER_ROLES } = require('../config/constants');

const router = express.Router();

router.get('/', testimonialController.listPublicTestimonials);
router.post('/', authMiddleware, testimonialController.submitTestimonial);

router.get('/pending/review', authMiddleware, roleMiddleware(USER_ROLES.ADMIN), testimonialController.reviewTestimonials);
router.patch('/:id', authMiddleware, roleMiddleware(USER_ROLES.ADMIN), testimonialController.updateTestimonial);

module.exports = router;

