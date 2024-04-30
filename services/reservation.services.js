const resModel = require("../models/reservation.model");

async function getAllReservations() {
  return await resModel.find();
}

async function getReservationByID(id) {
  if (!id || id.length != 24) throw Error("Invalid ID was sent");
  return await resModel.findById(id);
}
async function createReservation(params) {
  if (!params.userId || !params.dayOfWeek || !params.pickupTime)
    throw Error("Request was sent with missing params");
  const newRes = new resModel(params);
  return await newRes.save();
}

async function updateReservationByID(id, updates) {
  if (!id || id.length != 24 || !updates)
    throw Error("Requesst was sent with missing params");
  return await resModel.findByIdAndUpdate(id, updates);
}

async function deleteReservationByID(id) {
  if (!id || id.length != 24)
    throw Error("Requesst was sent with missing params");
  return await resModel.findByIdAndDelete(id);
}

module.exports = {
  getAllReservations,
  getReservationByID,
  createReservation,
  updateReservationByID,
  deleteReservationByID,
};
