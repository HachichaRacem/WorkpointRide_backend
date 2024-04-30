const vehServices = require("../services/vehicle.services");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json(await vehServices.getAllVehicles());
  } catch (e) {
    console.log("[VEHICLE]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const vehicle = await vehServices.getVehicleByID(req.params.id);
    if (!vehicle)
      return res
        .status(500)
        .json({ error: "No vehicle was found with that ID" });
    res.json(vehicle);
  } catch (e) {
    console.log("[VEHICLE]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedVehicle = await vehServices.deleteVehicleByID(req.params.id);
    if (!deletedVehicle)
      return res
        .status(500)
        .json({ error: "No vehicle was found with that ID to be deleted" });
    res.json({ status: "Deleted", vehicle: deletedVehicle });
  } catch (e) {
    console.log("[VEHICLE]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedVehicle = await vehServices.updateVehicleByID(
      req.params.id,
      req.body
    );
    if (!updatedVehicle)
      return res
        .status(500)
        .json({ error: "No vehicle was found with that ID to be updated" });
    res.json({ status: "Updated", vehicle: updatedVehicle });
  } catch (e) {
    console.log("[VEHICLES]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newVehicle = await vehServices.createVehicle(req.body);
    if (!newVehicle)
      return res.status(500).json({ error: "Could not create a new vehicle" });
    res.json({ status: "Created", vehicle: newVehicle });
  } catch (e) {
    console.log("[VEHICLES]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
