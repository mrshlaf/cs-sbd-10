const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AuthController = require('../controllers/auth.controller');

router.post('/login', async (req, res, next) => {
    try {
        const result = await AuthController.login(req, res, next);

        // result berisi { user: { id, name, ... } }
        const token = jwt.sign(
            {
                userId: result.user.id,
                email: result.user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            payload: {
                token,
                user: result.user,
            },
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;