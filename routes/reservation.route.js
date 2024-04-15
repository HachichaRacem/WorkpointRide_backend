const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/auth.middleware');
const reservationController = require('../controllers/reservation.controller');


router.get('/', isAuth, reservationController.getAllReservations);
router.get('/:id', reservationController.getReservationById);
router.post('/create', reservationController.createReservation);
router.put('/update/:id', reservationController.updateReservationById);
router.delete('/delete/:id', reservationController.deleteReservationById);

module.exports = router;
