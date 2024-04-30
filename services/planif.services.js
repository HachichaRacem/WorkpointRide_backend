const planifModel = require("../models/planif.model");

async function getAllPlanifs() {
  return await planifModel.find();
}

async function getPlanifByID(id) {
  if (!id || id.length != 24) throw Error("Invalid Id was sent");
  return await planifModel.findById(id);
}

async function createPlanif(params) {
  if (
    !params.userId ||
    !params.routesId ||
    !params.startTime ||
    !params.daysOfWeek ||
    !params.availablePlaces
  )
    throw Error("Request was sent with missing params");
  const newPlanif = new planifModel(params);
  return await newPlanif.save();
}

async function updatePlanifByID(id, updates) {
  if (!id || id.length != 24 || !updates)
    Error("Request was sent with missing params");
  return await planifModel.findByIdAndUpdate(id, updates);
}
async function deletePlanifByID(id) {
  if (!id || id.length != 24) Error("Request was sent with missing params");
  return await planifModel.findByIdAndDelete(id);
}

module.exports = {
  getAllPlanifs,
  getPlanifByID,
  createPlanif,
  updatePlanifByID,
  deletePlanifByID,
};
