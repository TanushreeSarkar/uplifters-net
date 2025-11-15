const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: String,
    transactionId: String,
    receiptUrl: String,
    metadata: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;

