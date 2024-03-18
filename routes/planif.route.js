const express = require('express');
const router = express.Router();
const planifController = require('../controllers/planif.controller');

// Define routes for planif CRUD operations
router.get('/api/planifs', planifController.getAllPlanifs);
router.get('/api/planifs/:id', planifController.getPlanifById);
router.post('/api/planifs', planifController.createPlanif);
router.put('/api/planifs/:id', planifController.updatePlanifById);
router.delete('/api/planifs/:id', planifController.deletePlanifById);

module.exports = router;
