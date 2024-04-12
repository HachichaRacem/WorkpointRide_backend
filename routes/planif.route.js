const express = require('express');
const router = express.Router();
const planifController = require('../controllers/planif.controller');
const { authMiddleware: isAuth, restrict } = require('../middleware/auth.middleware');

// Define routes for planif CRUD operations
router.get('/api/planifs',isAuth,restrict('admin'), planifController.getAllPlanifs);
router.get('/api/planifs/:id',isAuth, planifController.getPlanifById);
router.post('/api/planifs',isAuth, planifController.createPlanif);
router.put('/api/planifs/:id',isAuth, planifController.updatePlanifById);
router.delete('/api/planifs/:id', isAuth,planifController.deletePlanifById);

module.exports = router;
