const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history.controller');
const { authMiddleware: isAuth, restrict } = require('../middleware/auth.middleware');


// Define routes for history CRUD operations
router.get('/api/history',isAuth,restrict('admin'), historyController.getAllHistories);
router.get('/api/history/:id',isAuth, historyController.getHistoryById);
router.post('/api/history', isAuth,historyController.createHistory);
router.put('/api/history/:id',isAuth, historyController.updateHistoryById);
router.delete('/api/history/:id', isAuth,historyController.deleteHistoryById);

module.exports = router;
