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

// @desc    Search memorials
// @route   GET /api/memorials/search
// @access  Public
exports.searchMemorials = asyncHandler(async (req, res, next) => {
  const { q } = req.query;

  if (!q || typeof q !== 'string') {
    return next(new ErrorResponse('Please provide a valid search query', 400));
  }

  const searchQuery = q.trim();
  if (searchQuery.length < 2) {
    return next(new ErrorResponse('Search query must be at least 2 characters', 400));
  }

  try {
    let memorials;

    memorials = await Memorial.find({
      $or: [
        { name: new RegExp(searchQuery, 'i') },
        { fathersName: new RegExp(searchQuery, 'i') },
        { grandfatherName: new RegExp(searchQuery, 'i') },
        { burialLocation: new RegExp(searchQuery, 'i') },
        { familyMember: new RegExp(searchQuery, 'i') }
      ]
    });
  
    console.log({
      success: true,
      count: memorials.length,
      data: memorials
    })
    res.status(200).json({
      success: true,
      count: memorials.length,
      data: memorials
    });
  } catch (err) {
    next(err);
  }
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
