const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  slug: String,
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt'],
    maxlength: [500, 'Excerpt cannot be more than 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Please provide content']
  },
  image: {
    type: String,
    validate: {
      validator: (value) => !value || validator.isURL(value),
      message: 'Please provide a valid image URL'
    }
  },
  video: {
    type: String,
    validate: {
      validator: (value) => !value || validator.isURL(value),
      message: 'Please provide a valid video URL'
    }
  },
  tags: [String],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for comments
articleSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'article',
  justOne: false
});

articleSchema.virtual('commentCount').get(function() {
  return this.comments?.length || 0;
});

// Create article slug from title
articleSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Update updatedAt timestamp
articleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Query middleware to populate comments
articleSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'author',
    select: 'name avatar'
  }).populate({
    path: 'comments',
    select: 'content user createdAt',
    options: { sort: { createdAt: -1 } }
  });
  next();
});

module.exports = mongoose.model('Article', articleSchema);