const resServices = require("../services/reservation.services");
const express = require("express");
const router = express.Router();
// Get all reservations

router.get("/", async (req, res) => {
  try {
    res.json(await resServices.getAllReservations());
  } catch (e) {
    console.log("[RESERVATION]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const reservation = await resServices.getReservationByID(req.params.id);
    if (!reservation)
      return res
        .status(500)
        .json({ error: "No reservation was found with that ID" });
    res.json(reservation);
  } catch (e) {
    console.log("[RESERVATION]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newRes = await resServices.createReservation(req.body);
    if (!newRes)
      return res
        .status(500)
        .json({ error: "Could not create new reservation" });
    res.json({ status: "Created", reservation: newRes });
  } catch (e) {
    console.log("[RESERVATION]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedRes = await resServices.deleteReservationByID(req.params.id);
    if (!deletedRes)
      return res
        .status(500)
        .json({ error: "No reservation was found with that ID to delete" });
    res.json({ status: "Deleted", reservation: deletedRes });
  } catch (e) {
    console.log("[RESERVATION]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedRes = await resServices.updateReservationByID(
      req.params.id,
      req.body
    );
    if (!updatedRes)
      return res
        .status(500)
        .json({ error: "No reservation was found with that ID to update" });
    res.json({ status: "Updated", reservation: updatedRes });
  } catch (e) {
    console.log("[RESERVATION]: %s \n %s", e, e.stack);
    res.status(500).json({ error: e.message });
  }
});

// Get reservation by ID
const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = router;
