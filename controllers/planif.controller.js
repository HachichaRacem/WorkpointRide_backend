// planif.controller.js
const Planif = require('../models/planif.model');

// Get all planifs
const getAllPlanifs = async (req, res) => {
    try {
        const planifs = await Planif.find();
        res.json(planifs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get planif by ID
const getPlanifById = async (req, res) => {
    try {
        const planif = await Planif.findById(req.params.id);
        if (!planif) {
            return res.status(404).json({ message: 'Planif not found' });
        }
        res.json(planif);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new planif
const createPlanif = async (req, res) => {
    try {
        const { userId, routesId, startTime, daysOfWeek, availablePlaces } = req.body;
        const planif = new Planif({ userId, routesId, startTime, daysOfWeek, availablePlaces });
        await planif.save();
        res.status(201).json({ message: 'Planif created successfully', planif });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update planif by ID
const updatePlanifById = async (req, res) => {
    try {
        const { userId, routesId, startTime, daysOfWeek, availablePlaces } = req.body;
        const updatedPlanif = await Planif.findByIdAndUpdate(req.params.id, { userId, routesId, startTime, daysOfWeek, availablePlaces }, { new: true });
        if (!updatedPlanif) {
            return res.status(404).json({ message: 'Planif not found' });
        }
        res.json({ message: 'Planif updated successfully', planif: updatedPlanif });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete planif by ID
const deletePlanifById = async (req, res) => {
    try {
        const deletedPlanif = await Planif.findByIdAndDelete(req.params.id);
        if (!deletedPlanif) {
            return res.status(404).json({ message: 'Planif not found' });
        }
        res.json({ message: 'Planif deleted successfully', planif: deletedPlanif });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllPlanifs,
    getPlanifById,
    createPlanif,
    updatePlanifById,
    deletePlanifById
};
