const express = require('express');
const router = express.Router();
const {
  register, login, verifyEmail,
  forgotPassword, resetPassword,
  getAllUsers, updateUser, deleteUser
} = require('../controllers/userController');

const { protect } = require('../../../middlewares/authMiddleware');
const { adminOnly } = require('../../../middlewares/adminMiddleware');

// Public
router.post('/register', register);
router.post('/login', login);
router.get('/verify/:token', verifyEmail);
router.post('/forgot', forgotPassword);
router.post('/reset/:token', resetPassword);

// Admin only
router.get('/', protect, adminOnly, getAllUsers);
router.put('/:id', protect, adminOnly, updateUser);
router.delete('/:id', protect, adminOnly, deleteUser);

module.exports = router;
