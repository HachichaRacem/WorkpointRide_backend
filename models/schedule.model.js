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
      ref: "Routes",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    scheduledDate: {
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

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
