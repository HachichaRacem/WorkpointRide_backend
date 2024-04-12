const express = require('express');
const router = express.Router();


const reservationController = require('../controllers/reservation.controller');
const { authMiddleware: isAuth, restrict } = require('../middleware/auth.middleware');

router.get('/', isAuth, reservationController.getAllReservations);
router.get('/:id',isAuth, reservationController.getReservationById);
router.post('/create',isAuth, reservationController.createReservation);
router.put('/update/:id',isAuth, reservationController.updateReservationById);
router.delete('/delete/:id',isAuth, reservationController.deleteReservationById);

module.exports = router;
