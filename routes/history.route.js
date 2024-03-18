const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history.controller');

// Define routes for history CRUD operations
router.get('/api/history', historyController.getAllHistories);
router.get('/api/history/:id', historyController.getHistoryById);
router.post('/api/history', historyController.createHistory);
router.put('/api/history/:id', historyController.updateHistoryById);
router.delete('/api/history/:id', historyController.deleteHistoryById);

module.exports = router;
