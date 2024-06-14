const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth.middleware");
const reservationController = require("../controllers/reservation.controller");
const app = require("express")();

/**
 * @swagger
 * /api/reservations:
 *  get:
 *    summary: Get all reservations
 *    tags: [Reservations]
 *    responses:
 *      200:
 *        description: Reservations were retrieved successfully
 * /api/reservations/add:
 *  post:
 *    summary: Create a new reservation
 *    tags: [Reservations]
 *    responses:
 *      200:
 *        description: Reservation was created successfully
 * /api/reservations/{userID}:
 *    get:
 *      summary: Get reservations by user
 *      tags: [Reservations]
 *      responses:
 *        200:
 *          description: Reservations were retrieved successfully
 * /api/reservations/reservation-by-date/{userID}/{date}:
 *    get:
 *      summary: Get reservations by date
 *      tags: [Reservations]
 *      responses:
 *        200:
 *          description: Reservations were retrieved successfully
 * /api/reservations/{id}:
 *  put:
 *    summary: Update a reservation
 *    tags: [Reservations]
 *    responses:
 *      200:
 *        description: Reservation was updated successfully
 *  delete:
 *    summary: Delete a reservation
 *    tags: [Reservations]
 *    responses:
 *      200:
 *        description: Reservation was deleted successfully
 */

router.get("/", reservationController.getAllReservations);
router.get("/:userID", reservationController.getReservationByUser);
router.get(
  "/reservation-by-date/:userID/:date",
  reservationController.getReservationByDate
);
router.post("/add", reservationController.createReservation);
router.put("/:id", isAuth, reservationController.updateReservationByID);
router.delete(
  "/deleteReservationByID/:id",
  reservationController.deleteReservationByID
);

module.exports = router;
