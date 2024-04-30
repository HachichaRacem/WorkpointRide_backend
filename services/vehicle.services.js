const vehModel = require("../models/vehicle.model");

async function getAllVehicles() {
  return vehModel.find();
}

async function getVehicleByID(id) {
  if (!id || id.length != 24) throw Error("Invalid Id was sent");
  return await vehModel.findById(id);
}

async function createVehicle(params) {
  if (
    !params.userId ||
    !params.model ||
    !params.brand ||
    !params.type ||
    !params.fuelType ||
    !params.maxNbPlaces
  )
    throw Error("Request was sent with missing paramms");
  const newVeh = new vehModel(params);
  return await newVeh.save();
}

async function updateVehicleByID(id, updates) {
  if (!id || id.length != 24 || !updates)
    Error("Request was sent with missing params");
  return await vehModel.findByIdAndUpdate(id, updates);
}
async function deleteVehicleByID(id) {
  if (!id || id.length != 24) Error("Request was sent with missing params");
  return await vehModel.findByIdAndDelete(id);
}

module.exports = {
  getAllVehicles,
  getVehicleByID,
  updateVehicleByID,
  deleteVehicleByID,
  createVehicle,
};
