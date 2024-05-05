const historyModel = require("../models/history.model");

exports.getAllHistories = async () => {
  return await historyModel.find();
};

exports.getHistoryByUser = async (userID) => {
  return await historyModel.findOne({ user: userID });
};

exports.createHistory = async (params) => {
  const newHistory = new historyModel(params);
  return await newHistory.save();
};

exports.updateHistoryByID = async (id, updates) => {
  return await historyModel.findByIdAndUpdate(id, updates);
};

exports.deleteHistoryByID = async (id) => {
  return await historyModel.findByIdAndDelete(id);
};
