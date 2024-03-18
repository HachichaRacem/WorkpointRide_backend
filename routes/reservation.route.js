const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');

router.get('/api/reservations', reservationController.getAllReservations);
router.get('/api/reservations/:id', reservationController.getReservationById);
router.post('/api/reservations', reservationController.createReservation);
router.put('/api/reservations/:id', reservationController.updateReservationById);
router.delete('/api/reservations/:id', reservationController.deleteReservationById);

module.exports = router;
