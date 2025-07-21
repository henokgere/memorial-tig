const expressAsyncHandler = require('express-async-handler');
const Book = require('../models/Books');
const ErrorResponse = require('../../../utils/errorResponse');

// Create Book
exports.createBook = async (req, res) => {
  try {
    const { title, author, description, category } = req.body;
    const coverImage = req.file?.path;

    const book = await Book.create({
      title,
      author,
      description,
      category,
      coverImage,
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get All Books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('createdBy', 'name email');
    res.status(200).json({ success: true, data: books });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Search books
// @route   GET /api/books/search
// @access  Public
exports.searchBooks = expressAsyncHandler(async (req, res, next) => {
  const { q, category } = req.query;

  // Validate query
  if (!q || typeof q !== 'string') {
    return next(new ErrorResponse('Please provide a valid search query', 400));
  }

  const searchQuery = q.trim();
  if (searchQuery.length < 2) {
    return next(new ErrorResponse('Search query must be at least 2 characters', 400));
  }

  try {
    // Build query
    const query = {
      $or: [
        { title: new RegExp(searchQuery, 'i') },
        { author: new RegExp(searchQuery, 'i') },
        { description: new RegExp(searchQuery, 'i') }
      ]
    };

    // Add category filter if provided
    if (category) {
      query.category = category;
    }

    // Try text search first if available
    let books;

    books = await Book.find(query);


    console.log({
      success: true,
      count: books.length,
      data: books
    })
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });

  } catch (err) {
    console.error('Book search error:', err);
    next(new ErrorResponse('Search failed. Please try again.', 500));
  }
});

// Get Single Book
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, error: 'Not found' });

    res.status(200).json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Update Book
exports.updateBook = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file?.path) {
      updates.coverImage = req.file.path;
    }

    const book = await Book.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!book) return res.status(404).json({ success: false, error: 'Not found' });

    res.status(200).json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Delete Book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, error: 'Not found' });

    await book.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
