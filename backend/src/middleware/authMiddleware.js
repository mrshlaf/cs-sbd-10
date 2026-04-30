const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');

const authMiddleware = (req, res, next) => {
    try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError('Unauthorized', 401);
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
    } catch (err) {
    next(new AppError('Invalid or expired token', 401));
    }
};

module.exports = authMiddleware;