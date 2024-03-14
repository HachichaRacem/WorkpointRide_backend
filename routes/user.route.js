const router = require('express').Router();

const UserController = require('../controllers/user.controller');

router.post('/api/registration', UserController.register);
router.post('/api/login', UserController.login);
module.exports = router;
