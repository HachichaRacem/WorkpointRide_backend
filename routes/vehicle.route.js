const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');
const { authMiddleware: isAuth, restrict } = require('../middleware/auth.middleware');



router.get('/',isAuth, vehicleController.getAllVehicles);
router.get('/:id',isAuth, vehicleController.getVehicleById);
router.post('/', isAuth,vehicleController.createVehicle);
router.put('/:id', isAuth,vehicleController.updateVehicleById);
router.delete('/:id', isAuth, restrict('admin'), vehicleController.deleteVehicleById);

module.exports = router;
