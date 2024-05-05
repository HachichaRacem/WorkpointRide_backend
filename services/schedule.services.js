const scheduleModel = require("../models/schedule.model");

exports.getAllSchedule = async () => {
  return await scheduleModel.find();
};

exports.getScheduleByUser = async (userID) => {
  if (!userID || userID.length != 24) throw Error("Invalid ID was sent");
  return await scheduleModel.findOne({ userId: userID });
};

exports.createSchedule = async (params) => {
  if (
    !params.userId ||
    !params.routesId ||
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
