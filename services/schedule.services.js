const scheduleModel = require("../models/schedule.model");
const Reservation = require('../models/reservation.model');

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

exports.getSchedulesWithReservations = async (req, res) => {
  try {
      const { date, time, routeId } = req.query;
      const dateTime = new Date(`${date}T${time}`);

     
      //nlawij 3al planif b filtre route ou wa9t 
      const schedules = await Schedule.find({
          routesId: routeId,
          startTime: {
              $gte: new Date(dateTime),
              $lt: new Date(dateTime.getTime() + 60000 * 60) 
          }
      }).populate({
          path: 'userId', 
          select: 'firstName lastName'
      });

      //chya3mil get lil reservation alli marbouta bil schedule mou3ayan
      for (let schedule of schedules) {
          schedule.reservations = await Reservation.find({
              schedule: schedule._id,
              pickupTime: {
                  $gte: new Date(dateTime),
                  $lt: new Date(dateTime.getTime() + 60000 * 60)
              }
          }).populate('user', 'firstName ','lastName', 'phoneNumber');
      }

      res.json(schedules);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching schedules and reservations', error });
  }
};