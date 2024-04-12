const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

const { authMiddleware: isAuth, restrict } = require('../middleware/auth.middleware');
// User routes
router.post('/register',UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/', isAuth,restrict('admin'),UserController.getAllUsers);
router.post('/profile',isAuth, UserController.createUserProfile);
router.get('/profile/:id',isAuth, UserController.getUserProfileById);
router.put('/profile/:id',isAuth, UserController.updateUserProfileById);
router.delete('/profile/:id',isAuth, UserController.deleteUserProfileById);

module.exports = router;
