const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

// User routes
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/', UserController.getAllUsers);
router.post('/profile', UserController.createUserProfile);
router.get('/profile/:id', UserController.getUserProfileById);
router.put('/profile/:id', UserController.updateUserProfileById);
router.delete('/profile/:id', UserController.deleteUserProfileById);

module.exports = router;
