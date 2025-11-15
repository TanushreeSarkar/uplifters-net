const express = require('express');
const campaignController = require('../controllers/campaignController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { USER_ROLES } = require('../config/constants');

const router = express.Router();

router.get('/', campaignController.listCampaigns);
router.get('/:slug', campaignController.getCampaign);

router.post('/', authMiddleware, roleMiddleware(USER_ROLES.ADMIN), campaignController.createCampaign);
router.put('/:id', authMiddleware, roleMiddleware(USER_ROLES.ADMIN), campaignController.updateCampaign);
router.delete('/:id', authMiddleware, roleMiddleware(USER_ROLES.ADMIN), campaignController.deleteCampaign);

module.exports = router;

