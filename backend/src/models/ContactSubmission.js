const mongoose = require('mongoose');
const { CONTACT_STATUS } = require('../config/constants');

const contactSubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(CONTACT_STATUS),
      default: CONTACT_STATUS.NEW,
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes: String,
    resolvedAt: Date,
  },
  { timestamps: true }
);

const ContactSubmission = mongoose.model('ContactSubmission', contactSubmissionSchema);

module.exports = ContactSubmission;

