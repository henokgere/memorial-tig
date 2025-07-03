const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  message: {
    type: String,
    required: [true, 'Feedback message is required'],
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
