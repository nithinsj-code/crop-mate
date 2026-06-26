const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true },
  date: { type: Date, required: true },
  type: { 
    type: String, 
    enum: ['plowing', 'sowing', 'irrigation', 'harvesting', 'spraying', 'other'],
    required: true 
  },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
