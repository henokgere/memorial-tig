const Memorial = require('../models/Memorial');
const asyncHandler = require('express-async-handler');
const uploadToCloudinary = require('../../../utils/cloudinary');

// @desc    Get all memorials
// @route   GET /api/memorials
// @access  Public
exports.getMemorials = asyncHandler(async (req, res) => {
  const memorials = await Memorial.find();
  res.status(200).json({
    success: true,
    count: memorials.length,
    data: memorials,
  });
});

// @desc    Get single memorial
// @route   GET /api/memorials/:id
// @access  Public
exports.getMemorial = asyncHandler(async (req, res) => {
  const memorial = await Memorial.findById(req.params.id);
  if (!memorial) {
    res.status(404);
    throw new Error('Memorial not found');
  }

  res.status(200).json({
    success: true,
    data: memorial,
  });
});

// @desc    Create a new memorial
// @route   POST /api/memorials
// @access  Private
exports.createMemorial = asyncHandler(async (req, res) => {
  const { body, file, user } = req;

  let imageUrl = '';
  if (file) {
    const result = await uploadToCloudinary(file.buffer, Date.now().toString());
    imageUrl = result.secure_url;
  }

  const memorial = await Memorial.create({
    ...body,
    imageUrl,
    createdBy: user.id,
  });

  res.status(201).json({
    success: true,
    data: memorial,
  });
});

// @desc    Update a memorial
// @route   PUT /api/memorials/:id
// @access  Private
exports.updateMemorial = asyncHandler(async (req, res) => {
  const memorial = await Memorial.findById(req.params.id);
  if (!memorial) {
    res.status(404);
    throw new Error('Memorial not found');
  }

  // Only owner can update
  if (memorial.createdBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to update this memorial');
  }

  const updated = await Memorial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: updated,
  });
});

// @desc    Delete a memorial
// @route   DELETE /api/memorials/:id
// @access  Private
exports.deleteMemorial = asyncHandler(async (req, res) => {
  const memorial = await Memorial.findById(req.params.id);
  if (!memorial) {
    res.status(404);
    throw new Error('Memorial not found');
  }

  // Only owner can delete
  if (memorial.createdBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to delete this memorial');
  }

  await memorial.remove();

  res.status(200).json({
    success: true,
    message: 'Memorial deleted successfully',
  });
});
