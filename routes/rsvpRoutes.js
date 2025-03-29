const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Register User
router.post('/register', UserController.registerUser);

// Check-in User
router.post('/check-in', UserController.checkInUser);

// Check-out User
router.post('/check-out', UserController.checkOutUser);

module.exports = router;
