const mongoose = require('mongoose');

const impactMetricSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: Number, default: 0 },
    unit: { type: String },
    lastUpdated: { type: Date, default: Date.now },
    source: { type: String },
  },
  { timestamps: true }
);

const ImpactMetric = mongoose.model('ImpactMetric', impactMetricSchema);

module.exports = ImpactMetric;

