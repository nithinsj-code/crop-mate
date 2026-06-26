const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  location: {
    district: { type: String, required: true },
    state: { type: String, required: true }
  },
  sizeAcres: { type: Number, required: true },
  soilType: { 
    type: String, 
    enum: ['Black Soil', 'Red Soil', 'Alluvial Soil', 'Sandy Soil', 'Loamy Soil', 'Clay Soil'],
    required: true 
  },
  waterSource: { 
    type: String,
    enum: ['Low', 'Moderate', 'High'],
    required: true
  },
  primaryCrop: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Farm', farmSchema);
