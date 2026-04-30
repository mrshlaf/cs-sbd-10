const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { userRegistrationValidation, userUpdateValidation, validate } = require('../utils/validators');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/register', userRegistrationValidation, validate, UserController.register);
router.post('/login', UserController.login);

// Soal 2: Endpoint baru GET /user/:email untuk implementasi cache-aside
router.get('/:email', UserController.getUserByEmail);

// Protected routes (requires JWT)
router.put('/update', authMiddleware, userUpdateValidation, validate, UserController.updateProfile);
router.get('/history', authMiddleware, UserController.getTransactionHistory);
router.get('/total-spent', authMiddleware, UserController.getTotalSpent);
router.post('/top-up', authMiddleware, UserController.topUpBalance);

module.exports = router;