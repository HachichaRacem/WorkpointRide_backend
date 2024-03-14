const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['car', 'van', 'truck'], // Adjust as needed
    required: true,
  },
  fuelType: {
    type: String,
    enum: ['diesel', 'petrol', 'electric'], // Adjust as needed
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  maxNbPlaces: {
    type: Number,
    required: true,
  },
  horsePower: {
    type: Number,
  },
  // Add more attributes as needed
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;

