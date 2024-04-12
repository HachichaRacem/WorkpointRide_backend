const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const { authMiddleware: isAuth, restrict } = require('../middleware/auth.middleware');

// Define routes for notification CRUD operations
router.get('/api/notifications/:id', isAuth,notificationController.getNotificationById);
router.get('/api/notifications', isAuth,restrict('admin'),notificationController.getAllNotifications);
router.delete('/api/notifications/:id', isAuth,notificationController.deleteNotificationById);

module.exports = router;
