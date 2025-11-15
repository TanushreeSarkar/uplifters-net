const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    goalAmount: { type: Number, default: 0 },
    raisedAmount: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'active', 'completed', 'archived'], default: 'draft' },
    coverImage: String,
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
    startDate: Date,
    endDate: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;

