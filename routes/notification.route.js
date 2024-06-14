const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth.middleware");
const notificationController = require("../controllers/notification.controller");

/**
 * @swagger
 * /api/notifications:
 *  get:
 *    summary: Get all notifications
 *    tags: [Notifications]
 *    responses:
 *      200:
 *        description: Notifications were retrieved successfully
 *  post:
 *    summary: Create a new notification
 *    tags: [Notifications]
 *    responses:
 *      200:
 *        description: Notification was created successfully
 * /api/notifications/getByUser/{userID}:
 *  get:
 *    summary: Get notifications by user
 *    tags: [Notifications]
 *    responses:
 *      200:
 *        description: Notifications were retrieved successfully
 * /api/notifications/{id}:
 *  delete:
 *    summary: Delete a notification
 *    tags: [Notifications]
 *    responses:
 *      200:
 *        description: Notification was deleted successfully
 */

router.post("/", isAuth, notificationController.createNotification);
router.get(
  "/getByUser/:userID",
  isAuth,
  notificationController.getNotificationByUser
);
router.get("/", isAuth, notificationController.getAllNotifications);
router.delete("/:id", isAuth, notificationController.deleteNotificationByID);

module.exports = router;
