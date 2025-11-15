const User = require('../models/User');
const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');
const Testimonial = require('../models/Testimonial');
const GalleryItem = require('../models/GalleryItem');
const ContactSubmission = require('../models/ContactSubmission');
const asyncHandler = require('../middleware/asyncHandler');
const sendResponse = require('../utils/response');
const { TESTIMONIAL_STATUS, MEDIA_STATUS, CONTACT_STATUS } = require('../config/constants');

const getDashboardSummary = asyncHandler(async (req, res) => {
  const [donationTotal, users, campaigns, pendingTestimonials, pendingGallery, contactCounts] =
    await Promise.all([
      Donation.aggregate([
        { $match: { status: 'confirmed' } },
        { $group: { _id: null, amount: { $sum: '$amount' } } },
      ]),
      User.countDocuments(),
      Campaign.countDocuments({ status: 'active' }),
      Testimonial.countDocuments({ status: TESTIMONIAL_STATUS.PENDING }),
      GalleryItem.countDocuments({ status: MEDIA_STATUS.PENDING }),
      ContactSubmission.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    ]);

  const contactMap = contactCounts.reduce((acc, curr) => {
    acc[curr._id] = curr.count;
    return acc;
  }, {});

  return sendResponse(res, 200, 'Admin dashboard', {
    totalRaised: donationTotal[0]?.amount || 0,
    totalUsers: users,
    activeCampaigns: campaigns,
    pendingTestimonials,
    pendingGallery,
    contactStatus: { ...contactMap, [CONTACT_STATUS.NEW]: contactMap[CONTACT_STATUS.NEW] || 0 },
  });
});

module.exports = {
  getDashboardSummary,
};

