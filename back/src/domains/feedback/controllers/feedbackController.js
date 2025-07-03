const Feedback = require('../models/Feedback');
const asyncHandler = require('express-async-handler');

// @desc    Get all feedback
// @route   GET /api/feedbacks
// @access  Private/Admin
exports.getFeedbacks = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find().sort('-createdAt');
  res.status(200).json({ success: true, count: feedbacks.length, data: feedbacks });
});

// @desc    Create feedback
// @route   POST /api/feedbacks
// @access  Public
exports.createFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.create(req.body);
  res.status(201).json({ success: true, data: feedback });
});

// @desc    Delete feedback
// @route   DELETE /api/feedbacks/:id
// @access  Private/Admin
exports.deleteFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findByIdAndDelete(req.params.id);
  if (!feedback) {
    return res.status(404).json({ success: false, message: 'Feedback not found' });
  }
  res.status(200).json({ success: true, data: {} });
});
