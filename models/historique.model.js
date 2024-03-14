const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ride',
    required: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'canceled'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // Add more attributes as needed
});

const History = mongoose.model('History', historySchema);

module.exports = History;
