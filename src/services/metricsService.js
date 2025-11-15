const Donation = require('../models/Donation');
const ImpactMetric = require('../models/ImpactMetric');

const getSummaryMetrics = async () => {
  const [donationAgg, impactMetrics] = await Promise.all([
    Donation.aggregate([
      { $match: { status: 'confirmed' } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          donationCount: { $sum: 1 },
          donorCount: { $addToSet: '$user' },
        },
      },
    ]),
    ImpactMetric.find().lean(),
  ]);

  const donationSummary = donationAgg[0] || { totalAmount: 0, donationCount: 0, donorCount: [] };

  return {
    totalAmount: donationSummary.totalAmount,
    donationCount: donationSummary.donationCount,
    donorCount: donationSummary.donorCount.length,
    impactMetrics,
  };
};

module.exports = {
  getSummaryMetrics,
};

