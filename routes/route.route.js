const express = require('express');
const router = express.Router();
const routeController = require('../controllers/route.controller');

// Routes for route CRUD operations
router.post('/', routeController.createRoute);
router.get('/', routeController.getAllRoutes);
router.get('/:id', routeController.getRouteById);
router.put('/:id', routeController.updateRouteById);
router.delete('/:id', routeController.deleteRouteById);

module.exports = router;
