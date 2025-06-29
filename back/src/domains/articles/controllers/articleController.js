const asyncHandler = require('express-async-handler');
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const ErrorResponse = require('../../../utils/errorResponse');
const uploadToCloudinary = require('../../../utils/cloudinary');

// @desc    Get all articles
// @route   GET /api/articles
// @access  Public
exports.getArticles = asyncHandler(async (req, res) => {
  // Filtering
  const queryObj = { ...req.query, status: 'published' };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObj[el]);

  // Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  let query = Article.find(JSON.parse(queryStr));

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  // Execute query
  const articles = await query;

  res.status(200).json({
    success: true,
    count: articles.length,
    data: articles
  });
});

// @desc    Get single article
// @route   GET /api/articles/:slug
// @access  Public
exports.getArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findOne({ slug: req.params.slug });

  if (!article) {
    return next(new ErrorResponse(`Article not found with slug ${req.params.slug}`, 404));
  }

  res.status(200).json({
    success: true,
    data: article
  });
});

// @desc    Create article
// @route   POST /api/articles
// @access  Private
exports.createArticle = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.author = req.user.id;

  // Handle image upload
  if (req.files?.image) {
    const result = await uploadToCloudinary(req.files.image.tempFilePath, 'articles');
    req.body.image = result.secure_url;
  }

  // Handle video upload
  if (req.files?.video) {
    const result = await uploadToCloudinary(req.files.video.tempFilePath, 'articles/videos');
    req.body.video = result.secure_url;
  }

  // Create article
  const article = await Article.create(req.body);

  res.status(201).json({
    success: true,
    data: article
  });
});

// @desc    Update article
// @route   PUT /api/articles/:id
// @access  Private
exports.updateArticle = asyncHandler(async (req, res, next) => {
  let article = await Article.findById(req.params.id);

  if (!article) {
    return next(new ErrorResponse(`Article not found with id ${req.params.id}`, 404));
  }

  // Check ownership
  if (article.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to update this article', 401));
  }

  // Handle image upload
  if (req.files?.image) {
    const result = await uploadToCloudinary(req.files.image.tempFilePath, 'articles');
    req.body.image = result.secure_url;
  }

  // Handle video upload
  if (req.files?.video) {
    const result = await uploadToCloudinary(req.files.video.tempFilePath, 'articles/videos');
    req.body.video = result.secure_url;
  }

  // Update slug if title changed
  if (req.body.title && req.body.title !== article.title) {
    req.body.slug = slugify(req.body.title, { lower: true });
  }

  article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: article
  });
});

// @desc    Delete article
// @route   DELETE /api/articles/:id
// @access  Private
exports.deleteArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    return next(new ErrorResponse(`Article not found with id ${req.params.id}`, 404));
  }

  // Check ownership
  if (article.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to delete this article', 401));
  }

  await article.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get related articles
// @route   GET /api/articles/:slug/related
// @access  Public
exports.getRelatedArticles = asyncHandler(async (req, res, next) => {
  const article = await Article.findOne({ slug: req.params.slug });

  if (!article) {
    return next(new ErrorResponse(`Article not found with slug ${req.params.slug}`, 404));
  }

  const relatedArticles = await Article.find({
    tags: { $in: article.tags },
    _id: { $ne: article._id },
    status: 'published'
  }).limit(3);

  res.status(200).json({
    success: true,
    data: relatedArticles
  });
});

// @desc    Get article archive
// @route   GET /api/articles/archive
// @access  Public
exports.getArticleArchive = asyncHandler(async (req, res) => {
  const archive = await Article.aggregate([
    {
      $match: { status: 'published' }
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: '$_id.year',
        months: {
          $push: {
            month: '$_id.month',
            count: '$count'
          }
        },
        count: { $sum: '$count' }
      }
    },
    {
      $sort: { _id: -1 }
    },
    {
      $project: {
        year: '$_id',
        months: 1,
        count: 1,
        _id: 0
      }
    }
  ]);

  res.status(200).json({
    success: true,
    data: archive
  });
});

// @desc    Get articles by year/month
// @route   GET /api/articles/archive/:year/:month?
// @access  Public
exports.getArticlesByArchive = asyncHandler(async (req, res) => {
  const { year, month } = req.params;

  let startDate, endDate;
  
  if (month) {
    startDate = new Date(year, month - 1, 1);
    endDate = new Date(year, month, 1);
  } else {
    startDate = new Date(year, 0, 1);
    endDate = new Date(parseInt(year) + 1, 0, 1);
  }

  const articles = await Article.find({
    createdAt: {
      $gte: startDate,
      $lt: endDate
    },
    status: 'published'
  }).sort('-createdAt');

  res.status(200).json({
    success: true,
    count: articles.length,
    data: articles
  });
});

// @desc    Add comment to article
// @route   POST /api/articles/:id/comments
// @access  Private
exports.addComment = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.article = req.params.id;

  const comment = await Comment.create(req.body);

  res.status(201).json({
    success: true,
    data: comment
  });
});