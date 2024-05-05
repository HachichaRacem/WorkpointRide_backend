const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    routesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Routes",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    daysOfWeek: {
      type: Date,
      required: true,
    },
    availablePlaces: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Planif = mongoose.model("Schedule", scheduleSchema);

module.exports = Planif;
