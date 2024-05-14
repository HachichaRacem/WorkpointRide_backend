const scheduleModel = require("../models/schedule.model");
const resModel = require("../models/reservation.model");

exports.getAllSchedule = async () => {
  return await scheduleModel.find().populate("user").populate("routes");
};

exports.getScheduleByUser = async (userID) => {
  if (!userID || userID.length != 24) throw Error("Invalid ID was sent");
  return await scheduleModel.findOne({ userId: userID });
};

exports.getSchedulesWithReservationsByDate = async (date, userID) => {
  // Create date objects to cover the whole day from start to end
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  // Fetch schedules for the given user and date range
  const schedules = await scheduleModel
    .find({
      user: userID,
      scheduledDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
    .exec(); // Make sure to call exec() to properly execute the query
  // Attach reservations to each schedule
  const schedulesWithReservations = await Promise.all(
    schedules.map(async (schedule) => {
      const reservations = await resModel
        .find({ schedule: schedule._id })
        .populate("user")
        .exec();
      return {
        ...schedule.toObject(), // Convert mongoose document to a plain object
        reservations,
      };
    })
  );
  return schedulesWithReservations;
};

exports.createSchedule = async (params) => {
  if (
    !params.user ||
    !params.routes ||
    !params.startTime ||
    !params.daysOfWeek ||
    !params.availablePlaces
  )
    throw Error("Request was sent with missing params");
  const newSchedule = new scheduleModel(params);
  return await newSchedule.save();
};

exports.updateScheduleByID = async (id, updates) => {
  if (!id || id.length != 24 || !updates)
    Error("Request was sent with missing params");
  return await scheduleModel.findByIdAndUpdate(id, updates);
};
exports.deleteScheduleByID = async (id) => {
  if (!id || id.length != 24) Error("Request was sent with missing params");
  return await scheduleModel.findByIdAndDelete(id);
};
