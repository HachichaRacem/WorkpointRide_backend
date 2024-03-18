const Vehicle = require('../models/vehicle.model');

// Get all vehicles
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get vehicle by ID
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new vehicle
const createVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update vehicle by ID
const updateVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete vehicle by ID
const deleteVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicleById,
  deleteVehicleById,
};
