const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    routes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
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
