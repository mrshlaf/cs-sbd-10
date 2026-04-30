const { body, param, query } = require('express-validator');

// Regex patterns
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[0-9\s-]{7,20}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/;

// Validation rules
const userRegistrationValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name must be at most 100 characters'),
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters')
    // TODO: tambahkan validasi regex untuk username (hanya huruf, angka, underscore)
    ,
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    // TODO: tambahkan validasi regex untuk email
    ,
  body('phone')
    .optional()
    .trim()
    // TODO: tambahkan validasi regex untuk phone (format internasional)
    ,
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    // TODO: tambahkan validasi regex untuk password
    ,
];

const userUpdateValidation = [
  body('id')
    .isInt().withMessage('User ID must be an integer'),
  body('name')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Name must be at most 100 characters'),
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters')
    // TODO: validasi regex untuk username
    ,
  body('email')
    .optional()
    .trim()
    // TODO: validasi regex untuk email
    ,
  body('phone')
    .optional()
    .trim()
    // TODO: validasi regex untuk phone
    ,
  body('password')
    .optional()
    .trim()
    // TODO: validasi regex untuk password
    ,
  body('balance')
    .optional()
    .isInt({ min: 0 }).withMessage('Balance must be a non-negative integer'),
];

const transactionCreationValidation = [
  body('user_id')
    .isInt().withMessage('User ID must be an integer'),
  body('item_id')
    .isInt().withMessage('Item ID must be an integer'),
  body('quantity')
    .isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description must be at most 500 characters'),
];

const transactionIdValidation = [
  param('id')
    .isInt().withMessage('Transaction ID must be an integer'),
];

const validate = (req, res, next) => {
  const errors = require('express-validator').validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(err => err.msg);
    return res.status(400).json({
      success: false,
      message: messages.join('. '),
      payload: null,
    });
  }
  next();
};

module.exports = {
  // emailRegex, passwordRegex, phoneRegex dihapus
  userRegistrationValidation,
  userUpdateValidation,
  transactionCreationValidation,
  transactionIdValidation,
  validate,
};