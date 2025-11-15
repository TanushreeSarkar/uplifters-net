const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { USER_ROLES } = require('../config/constants');

const router = express.Router();

router.get('/me', authMiddleware, userController.getMe);
router.put('/me', authMiddleware, userController.updateMe);

router.get('/', authMiddleware, roleMiddleware(USER_ROLES.ADMIN), userController.listUsers);
router.patch('/:id/role', authMiddleware, roleMiddleware(USER_ROLES.ADMIN), userController.updateUserRole);

module.exports = router;

