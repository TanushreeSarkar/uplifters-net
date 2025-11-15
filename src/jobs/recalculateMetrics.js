const cron = require('node-cron');
const ImpactMetric = require('../models/ImpactMetric');
const Donation = require('../models/Donation');
const logger = require('../config/logger');

const scheduleMetricRefresh = () => {
  cron.schedule('0 * * * *', async () => {
    try {
      const totalAmount = await Donation.aggregate([
        { $match: { status: 'confirmed' } },
        {
          $group: {
            _id: null,
            amount: { $sum: '$amount' },
          },
        },
      ]);

      await ImpactMetric.findOneAndUpdate(
        { type: 'funds_raised' },
        {
          label: 'Funds Raised',
          value: totalAmount[0]?.amount || 0,
          unit: 'USD',
          lastUpdated: new Date(),
        },
        { upsert: true }
      );

      logger.info('Impact metrics refreshed');
    } catch (error) {
      logger.error(`Metric refresh failed: ${error.message}`);
    }
  });
};

module.exports = scheduleMetricRefresh;

