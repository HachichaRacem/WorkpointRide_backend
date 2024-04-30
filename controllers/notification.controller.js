const notifServices = require("../services/notification.services");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json(await notifServices.getAllNotifications());
  } catch (e) {
    console.log("[NOTIFICATION]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const notification = await notifServices.getNotificationByID(req.params.id);
    if (!notification)
      return res.status(404).json({ error: "No notification was found" });
    res.json(notification);
  } catch (e) {
    console.log("[NOTIFICATION]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newNotif = await notifServices.createNotification(req.body);
    if (!newNotif)
      return res
        .status(500)
        .json({ error: "Could not create new notification" });
    res.json({ status: "Created", notification: newNotif });
  } catch (e) {
    console.log("[NOTIFICATION]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedNotif = await notifServices.updateNotificationByID(
      req.params.id,
      req.body
    );
    if (!updatedNotif)
      return res.status(500).json({
        error: "No notification with that ID was found to be updated",
      });
    res.json({ status: "Updated", notification: updatedNotif });
  } catch (e) {
    console.log("[NOTIFICATION]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedNotif = await notifServices.deleteNotificationByID(
      req.params.id
    );
    if (!deletedNotif)
      return res.status(500).json({
        error: "No notification with that ID was found to be deleted",
      });
    res.json({ status: "Deleted", notification: deletedNotif });
  } catch (e) {
    console.log("[NOTIFICATION]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
