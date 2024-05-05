const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
    },
    planif: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Planif",
    },
    reservation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
    },
    status: {
      type: String,
      enum: ["upcoming", "completed", "canceled"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
