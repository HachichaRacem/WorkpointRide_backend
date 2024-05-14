const resModel = require("../models/reservation.model");

exports.getAllReservations = async () => {
  return await resModel.find();
};

exports.getReservationByUser = async (userID) => {
  if (!userID || userID.length != 24) throw Error("Invalid ID was sent");
  return await resModel.findOne({ userId: userID });
};
exports.createReservation = async (params) => {
  if (!params.user || !params.dayOfWeek || !params.pickupTime)
    throw Error("Request was sent with missing params");
  const newRes = new resModel.create(params);
  return await newRes.save();
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
