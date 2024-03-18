const Reservation = require('../models/reservation.model');

// Get all reservations
const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get reservation by ID
const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new reservation
const createReservation = async (req, res) => {
    try {
        const { userId, dayOfWeek, pickupTime } = req.body;
        const reservation = new Reservation({ userId, dayOfWeek, pickupTime });
        await reservation.save();
        res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update reservation by ID
const updateReservationById = async (req, res) => {
    try {
        const { dayOfWeek, pickupTime } = req.body;
        const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, {
            dayOfWeek,
            pickupTime
        }, { new: true });
        if (!updatedReservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.json({ message: 'Reservation updated successfully', reservation: updatedReservation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete reservation by ID
const deleteReservationById = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!deletedReservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.json({ message: 'Reservation deleted successfully', reservation: deletedReservation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservationById,
    deleteReservationById
};
