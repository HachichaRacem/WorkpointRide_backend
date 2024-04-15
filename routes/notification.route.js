const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');

// Define routes for notification CRUD operations
router.get('/:id', notificationController.getNotificationById);
router.get('/', notificationController.getAllNotifications);
router.delete('/:id', notificationController.deleteNotificationById);

module.exports = router;
