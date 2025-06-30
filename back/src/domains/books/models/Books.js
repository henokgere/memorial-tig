const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Please add an author'],
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ['fiction', 'non-fiction', 'poetry', 'biography', 'essay', 'other'],
    default: 'other',
  },
  coverImage: {
    type: String,
  },
  bookUrl: {
    type: String,
    validate: {
      validator: function (v) {
        return !v || /^https?:\/\/[\w.-]+\.[a-z]{2,}.*$/i.test(v);
      },
      message: props => `${props.value} is not a valid URL`,
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', bookSchema);
