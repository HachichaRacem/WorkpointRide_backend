const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth.middleware");
const reservationController = require("../controllers/reservation.controller");

router.get("/", reservationController.getAllReservations);
router.get("/:userID", reservationController.getReservationByUser);
router.get(
  "/reservation-by-date/:userID/:date",
  reservationController.getReservationByDate
);
router.post("/", reservationController.createReservation);
router.put("/:id", isAuth, reservationController.updateReservationByID);
router.delete("/:id", reservationController.deleteReservationByID);

module.exports = router;
