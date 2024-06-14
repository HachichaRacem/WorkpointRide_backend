const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/schedule.controller");
const isAuth = require("../middleware/auth.middleware");

/**
 * @swagger
 * /api/schedules:
 *  get:
 *    summary: Get all schedules
 *    tags: [Schedules]
 *    responses:
 *      200:
 *        description: Schedules were retrieved successfully
 * /api/schedules/add:
 *  post:
 *    summary: Create a new schedule
 *    tags: [Schedules]
 *    responses:
 *      200:
 *        description: Schedule was created successfully
 * /api/schedules/{userID}:
 *  get:
 *    summary: Get schedules by user
 *    tags: [Schedules]
 *    responses:
 *      200:
 *        description: Schedules were retrieved successfully
 * /api/schedules/getNearest:
 *  post:
 *    summary: Get nearest schedules
 *    tags: [Schedules]
 *    responses:
 *      200:
 *        description: Schedules were retrieved successfully
 * /api/schedules/{id}:
 *  put:
 *    summary: Update a schedule
 *    tags: [Schedules]
 *    responses:
 *      200:
 *        description: Schedule was updated successfully
 * /api/schedules/deleteScheduleByID/{id}:
 *  delete:
 *    summary: Delete a schedule
 *    tags: [Schedules]
 *    responses:
 *      200:
 *        description: Schedule was deleted successfully
 * /api/schedules/schedules-with-date/{date}/{userID}:
 *  get:
 *    summary: Get schedules with reservations by date
 *    tags: [Schedules]
 *    responses:
 *      200:
 *        description: Schedules were retrieved successfully
 */

router.get("/", scheduleController.getAllSchedule);
router.get("/:userID", isAuth, scheduleController.getScheduleByUser);
router.post("/getNearest", isAuth, scheduleController.getNearest);
router.post("/add", isAuth, scheduleController.createSchedule);
router.put("/:id", isAuth, scheduleController.updateScheduleByID);

router.delete("/deleteScheduleByID/:id", scheduleController.deleteScheduleByID);
router.get(
  "/schedules-with-date/:date/:userID",
  isAuth,
  scheduleController.getSchedulesWithReservations
);

module.exports = router;
