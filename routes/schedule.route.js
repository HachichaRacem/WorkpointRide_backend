const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/schedule.controller");
const isAuth = require("../middleware/auth.middleware");

router.get("/", scheduleController.getAllSchedule);
router.get("/:userID", isAuth, scheduleController.getScheduleByUser);
router.post("/", scheduleController.createSchedule);
router.put("/:id", isAuth, scheduleController.updateScheduleByID);
router.get(
  "/schedules-with-date/:date/:userID",
  scheduleController.getSchedulesWithReservationsByDate
);
router.delete("/:id", isAuth, scheduleController.deleteScheduleByID);

module.exports = router;
