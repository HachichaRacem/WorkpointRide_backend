const resModel = require("../models/reservation.model");

exports.getAllReservations = async () => {
  return await resModel.find();
};

exports.getReservationByUser = async (userID) => {
  if (!userID || userID.length != 24) throw Error("Invalid ID was sent");
  return await resModel
    .find({ user: userID })
    .populate("user")
    .populate("schedule");
};
exports.getReservationsByDate = async (userID, date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  const reservations = await resModel
    .find({
      user: userID,
      pickupTime: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
    .populate("user")
    .populate("schedule")
    .exec();
  return reservations;
};

exports.createReservation = async (params) => {
  return await resModel.create(params);
};

exports.updateReservationByID = async (id, updates) => {
  if (!id || id.length != 24 || !updates)
    throw Error("Requesst was sent with missing params");
  return await resModel.findByIdAndUpdate(id, updates);
};

exports.deleteReservationByID = async (id) => {
  if (!id || id.length != 24)
    throw Error("Requesst was sent with missing params");
  return await resModel.findByIdAndDelete(id);
};
