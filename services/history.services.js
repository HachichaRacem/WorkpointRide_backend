const historyModel = require("../models/history.model");

async function getAllHistories() {
  return await historyModel.find();
}

async function getHistoryByID(id) {
  if (!id || id.length != 24) {
    throw Error("Invalid ID was sent");
  }
  return await historyModel.findById(id);
}

async function createHistory(params) {
  if (!params.userId || !params.rideId || !params.status || !params.date)
    throw Error("Request sent with missing params");
  const newHistory = new historyModel(params);
  return await newHistory.save();
}

async function updateHistoryByID(id, updates) {
  if (!id || id.length != 24 || !updates)
    throw Error("Request sent with missing params");
  return await historyModel.findByIdAndUpdate(id, updates);
}

async function deleteHistoryById(id) {
  if (!id || id.length != 24) throw Error("Request sent with missing params");
  return await historyModel.findByIdAndDelete(id);
}

module.exports = {
  getAllHistories,
  getHistoryByID,
  updateHistoryByID,
  deleteHistoryById,
  createHistory,
};
