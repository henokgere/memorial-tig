const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Helper: generate JWT
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Email already in use' });

  const user = await User.create({ name, email, password });
  const token = user.createToken('emailVerificationToken');
  await user.save();

  // Send verification link (mocked)
  const verificationLink = `http://localhost:3000/api/users/verify/${token}`;
  console.log('Email Verification Link:', verificationLink);

  res.status(201).json({ message: 'User registered, please verify your email' });
};

exports.verifyEmail = async (req, res) => {
  const user = await User.findOne({
    emailVerificationToken: req.params.token,
    emailVerificationExpires: { $gt: Date.now() }
  });
  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  res.json({ message: 'Email verified successfully' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user._id);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: 'No user with that email' });

  const token = user.createToken('passwordResetToken');
  await user.save();

  const resetLink = `http://localhost:3000/api/users/reset/${token}`;
  console.log('Password Reset Link:', resetLink);

  res.json({ message: 'Reset link sent' });
};

exports.resetPassword = async (req, res) => {
  const user = await User.findOne({
    passwordResetToken: req.params.token,
    passwordResetExpires: { $gt: Date.now() }
  });
  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.json({ message: 'Password updated successfully' });
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.updateUser = async (req, res) => {
  const { name, role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { name, role }, { new: true });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted' });
};
