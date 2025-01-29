const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authenticateToken} = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/getUserData', authenticateToken, userController.getUserDataById);

module.exports = router;
