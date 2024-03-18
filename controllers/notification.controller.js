const Notification = require('../models/notification.model');

// Get notification by ID
const getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all notifications for the user
const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.userId });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete notification by ID
const deleteNotificationById = async (req, res) => {
    try {
        const deletedNotification = await Notification.findByIdAndDelete(req.params.id);
        if (!deletedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.json({ message: 'Notification deleted successfully', notification: deletedNotification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getNotificationById,
    getAllNotifications,
    deleteNotificationById
};
