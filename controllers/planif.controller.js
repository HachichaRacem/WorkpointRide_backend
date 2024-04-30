// planif.controller.js
const planifServices = require("../services/planif.services");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json(await planifServices.getAllPlanifs());
  } catch (e) {
    console.log("[PLANIFS]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const planif = await planifServices.getPlanifByID(req.params.id);
    if (!planif)
      return res
        .status(500)
        .json({ error: "No planif was found with that ID" });
    res.json(planif);
  } catch (e) {
    console.log("[PLANIFS]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPlanif = await planifServices.deletePlanifByID(req.params.id);
    if (!deletedPlanif)
      return res
        .status(500)
        .json({ error: "No planif was found with that ID to be deleted" });
    res.json({ status: "Deleted", planif: deletedPlanif });
  } catch (e) {
    console.log("[PLANIFS]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPlanif = await planifServices.updatePlanifByID(
      req.params.id,
      req.body
    );
    if (!updatedPlanif)
      return res
        .status(500)
        .json({ error: "No planif was found with that ID to be updated" });
    res.json({ status: "Updated", planif: updatedPlanif });
  } catch (e) {
    console.log("[PLANIFS]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPlanif = await planifServices.createPlanif(req.body);
    if (!newPlanif)
      return res.status(500).json({ error: "Could not create a new planif" });
    res.json({ status: "Created", planif: newPlanif });
  } catch (e) {
    console.log("[PLANIFS]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
