const Memorial = require('../models/Memorial');
const asyncHandler = require('express-async-handler');

// @desc    Get all memorials
// @route   GET /api/memorials
// @access  Public
exports.getMemorials = asyncHandler(async (req, res) => {
  const memorials = await Memorial.find().populate('tributes');
  res.status(200).json({
    success: true,
    count: memorials.length,
    data: memorials
  });
});

// @desc    Get single memorial
// @route   GET /api/memorials/:id
// @access  Public
exports.getMemorial = asyncHandler(async (req, res) => {
  const memorial = await Memorial.findById(req.params.id).populate('tributes');
  
  if (!memorial) {
    return res.status(404).json({
      success: false,
      error: 'Memorial not found'
    });
  }

  res.status(200).json({
    success: true,
    data: memorial
  });
});

// @desc    Create memorial
// @route   POST /api/memorials
// @access  Private
exports.createMemorial = asyncHandler(async (req, res) => {
  const memorial = await Memorial.create(req.body);
  
  res.status(201).json({
    success: true,
    data: memorial
  });
});

// @desc    Update memorial
// @route   PUT /api/memorials/:id
// @access  Private
exports.updateMemorial = asyncHandler(async (req, res) => {
  let memorial = await Memorial.findById(req.params.id);

  if (!memorial) {
    return res.status(404).json({
      success: false,
      error: 'Memorial not found'
    });
  }

  // Check ownership
  if (memorial.createdBy.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to update this memorial'
    });
  }

  memorial = await Memorial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: memorial
  });
});

// @desc    Delete memorial
// @route   DELETE /api/memorials/:id
// @access  Private
exports.deleteMemorial = asyncHandler(async (req, res) => {
  const memorial = await Memorial.findById(req.params.id);

  if (!memorial) {
    return res.status(404).json({
      success: false,
      error: 'Memorial not found'
    });
  }

  // Check ownership
  if (memorial.createdBy.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to delete this memorial'
    });
  }

  await memorial.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});