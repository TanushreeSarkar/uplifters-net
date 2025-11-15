const mongoose = require('mongoose');
const { NOTIFICATION_AUDIENCE } = require('../config/constants');

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    audience: {
      type: String,
      enum: Object.values(NOTIFICATION_AUDIENCE),
      default: NOTIFICATION_AUDIENCE.ALL,
    },
    link: String,
    scheduledAt: Date,
    sentAt: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;

