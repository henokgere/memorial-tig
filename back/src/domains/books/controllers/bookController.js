const Book = require('../models/Books');

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
