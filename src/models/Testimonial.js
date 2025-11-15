const mongoose = require('mongoose');
const { TESTIMONIAL_STATUS } = require('../config/constants');

const testimonialSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    status: {
      type: String,
      enum: Object.values(TESTIMONIAL_STATUS),
      default: TESTIMONIAL_STATUS.PENDING,
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;

