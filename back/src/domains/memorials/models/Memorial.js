const mongoose = require('mongoose');
const validator = require('validator');

const memorialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  birthDate: {
    type: Date,
    required: [true, 'Please provide birth date']
  },
  deathDate: {
    type: Date,
    required: [true, 'Please provide death date']
  },
  biography: {
    type: String,
    maxlength: [2000, 'Biography cannot be more than 2000 characters']
  },
  imageUrl: {
    type: String,
    validate: [validator.isURL, 'Please provide a valid URL']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for tributes
memorialSchema.virtual('tributes', {
  ref: 'Tribute',
  localField: '_id',
  foreignField: 'memorial',
  justOne: false
});

module.exports = mongoose.model('Memorial', memorialSchema);