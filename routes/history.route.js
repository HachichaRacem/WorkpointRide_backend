const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history.controller');

// Define routes for history CRUD operations
router.get('/', historyController.getAllHistories);
router.get('/:id', historyController.getHistoryById);
router.post('/', historyController.createHistory);
router.put('/:id', historyController.updateHistoryById);
router.delete('/:id', historyController.deleteHistoryById);

module.exports = router;
