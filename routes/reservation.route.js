const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth.middleware");
const reservationController = require("../controllers/reservation.controller");

router.get("/", isAuth, reservationController.getAllReservations);
router.get("/:userID", isAuth, reservationController.getReservationByUser);
router.post("/", isAuth, reservationController.createReservation);
router.put("/:id", isAuth, reservationController.updateReservationByID);
router.delete("/:id", isAuth, reservationController.deleteReservationByID);

module.exports = router;
