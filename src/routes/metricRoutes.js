const express = require('express');
const metricController = require('../controllers/metricController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { USER_ROLES } = require('../config/constants');

const router = express.Router();

router.get('/summary', metricController.getPublicMetrics);
router.post('/', authMiddleware, roleMiddleware(USER_ROLES.ADMIN), metricController.upsertMetric);
router.delete('/:id', authMiddleware, roleMiddleware(USER_ROLES.ADMIN), metricController.deleteMetric);

module.exports = router;

