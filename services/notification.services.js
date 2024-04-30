const notificationModel = require("../models/notification.model");

async function getNotificationByID(id) {
  if (!id || id.length != 24) throw Error("Invalid ID was sent");
  return await notificationModel.findById(id);
}

async function getAllNotifications() {
  return await notificationModel.find();
}

async function createNotification(params) {
  if (
    !params.userId ||
    !params.message ||
    !params.senderId ||
    !params.timestamp ||
    !params.isRead
  )
    throw Error("Request was sent with missing params");
  const newNotification = new notificationModel(params);
  return await newNotification.save();
}
async function updateNotificationByID(id, updates) {
  if (!id || id.length != 24 || !updates)
    throw Error("Request was sent with missing params");
  return await notificationModel.findByIdAndUpdate(id, updates);
}

async function deleteNotificationByID(id) {
  if (!id || id.length != 24)
    throw Error("Request was sent with missing params");
  return await notificationModel.findByIdAndDelete(id);
}

module.exports = {
  getAllNotifications,
  getNotificationByID,
  createNotification,
  updateNotificationByID,
  deleteNotificationByID,
};
