const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true },
  date: { type: Date, required: true },
  category: { 
    type: String, 
    enum: ['seeds', 'fertilizer', 'labor', 'equipment', 'water', 'other'],
    required: true 
  },
  amount: { type: Number, required: true },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
