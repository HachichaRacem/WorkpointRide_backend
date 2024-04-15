const express = require('express');
const router = express.Router();
const planifController = require('../controllers/planif.controller');

// Define routes for planif CRUD operations
router.get('/', planifController.getAllPlanifs);
router.get('/:id', planifController.getPlanifById);
router.post('/', planifController.createPlanif);
router.put('/:id', planifController.updatePlanifById);
router.delete(':id', planifController.deletePlanifById);

module.exports = router;
