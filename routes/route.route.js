const express = require('express');
const router = express.Router();
const routeController = require('../controllers/route.controller');

// Routes for route CRUD operations
router.post('/api/routes', routeController.createRoute);
router.get('/api/routes', routeController.getAllRoutes);
router.get('/api/routes/:id', routeController.getRouteById);
router.put('/api/routes/:id', routeController.updateRouteById);
router.delete('/api/routes/:id', routeController.deleteRouteById);

module.exports = router;
