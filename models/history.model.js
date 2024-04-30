const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ride",
    required: true,
  },
  status: {
    type: String,
    enum: ["upcoming", "completed", "canceled"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("History", historySchema);
