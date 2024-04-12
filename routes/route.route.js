const express = require('express');
const router = express.Router();
const routeController = require('../controllers/route.controller');
const { authMiddleware: isAuth, restrict } = require('../middleware/auth.middleware');
// Routes for route CRUD operations
router.post('/api/routes',isAuth, routeController.createRoute);
router.get('/api/routes',isAuth,restrict('admin'), routeController.getAllRoutes);
router.get('/api/routes/:id',isAuth, routeController.getRouteById);
router.put('/api/routes/:id',isAuth, routeController.updateRouteById);
router.delete('/api/routes/:id',isAuth, routeController.deleteRouteById);

module.exports = router;
