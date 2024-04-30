const routeModel = require("../models/route.model");
async function createRoute(params) {
  if (
    !params.user ||
    !params.startPoint ||
    !params.endPoint ||
    !params.startTime ||
    !params.daysOfWeek ||
    !params.duration ||
    !params.distance ||
    !params.type ||
    !params.polyline
  )
    throw Error("Request sent with missing params");
  const newRoute = new routeModel(params);
  return await newRoute.save();
}

async function getAllRoutes() {
  return await routeModel.find();
}

async function getRouteByID(id) {
  if (!id || id.length != 24) throw Error("Invalid ID was sent");
  return await routeModel.findById(id);
}

async function updateRouteByID(id, updates) {
  if (!id || !updates) throw Error("Request was sent with missing params");
  return await routeModel.findByIdAndUpdate(id, updates);
}

async function deleteRouteByID(id) {
  if (!id || id.length != 24) throw Error("Invalid ID was sent");
  return await routeModel.findByIdAndDelete(id);
}

module.exports = {
  createRoute,
  getAllRoutes,
  getRouteByID,
  updateRouteByID,
  deleteRouteByID,
};
