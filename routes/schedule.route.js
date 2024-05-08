const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/schedule.controller");
const isAuth = require("../middleware/auth.middleware");

router.get("/", isAuth, scheduleController.getAllSchedule);
router.get("/:userID", isAuth, scheduleController.getScheduleByUser);
router.post("/", isAuth, scheduleController.createSchedule);
router.put("/:id", isAuth, scheduleController.updateScheduleByID);
router.delete("/:id", isAuth, scheduleController.deleteScheduleByID);
router.get('/schedules-with-reservations', scheduleController.getSchedulesWithReservations);

module.exports = router;
