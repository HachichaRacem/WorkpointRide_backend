const notificationModel = require("../models/notification.model");

exports.getNotificationByUser = async (userID) => {
  return await notificationModel.findOne({ userId: userID });
};

exports.getAllNotifications = async () => {
  return await notificationModel.find();
};

exports.createNotification = async (params) => {
  const newNotification = new notificationModel(params);
  return await newNotification.save();
};

exports.deleteNotificationByID = async (id) => {
  return await notificationModel.findByIdAndDelete(id);
};
