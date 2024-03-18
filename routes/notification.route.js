const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');

// Define routes for notification CRUD operations
router.get('/api/notifications/:id', notificationController.getNotificationById);
router.get('/api/notifications', notificationController.getAllNotifications);
router.delete('/api/notifications/:id', notificationController.deleteNotificationById);

module.exports = router;
