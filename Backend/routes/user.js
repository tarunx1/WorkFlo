const express = require('express');
const { signup, login, logout, getMe } = require('../controllers/userControllers');
const auth = require('../middleware/auth');

const router = express.Router();

// Signup
router.post('/signup', signup);

// Login
router.post('/login', login);

// Logout
router.post('/logout', logout);

// Get current user
router.get('/me', auth, getMe);

module.exports = router;
