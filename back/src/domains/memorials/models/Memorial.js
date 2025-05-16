const mongoose = require('mongoose');
const validator = require('validator');

const memorialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  fatherName: {
    type: String,
    required: [true, 'Please provide father\'s name'],
    trim: true
  },
  grandfatherName: {
    type: String,
    trim: true
  },
  birthDate: {
    type: Date,
    required: [true, 'Please provide birth date']
  },
  deathDate: {
    type: Date,
    required: [true, 'Please provide death date']
  },
  placeOfBirth: {
    type: String,
    trim: true
  },
  placeOfDeath: {
    type: String,
    trim: true
  },
  causeOfDeath: {
    type: String,
    trim: true
  },
  burialLocation: {
    type: String,
    trim: true
  },
  familyMember: {
    type: String,
    trim: true
  },
  shortStory: {
    type: String,
    maxlength: [2000, 'Short story cannot be more than 2000 characters']
  },
  memorialMessage: {
    type: String,
    maxlength: [1000, 'Memorial message cannot be more than 1000 characters']
  },
  obituary: {
    type: String,
    maxlength: [1000, 'Obituary cannot be more than 1000 characters']
  },
  imageUrl: {
    type: String,
    validate: {
      validator: (value) => !value || validator.isURL(value),
      message: 'Please provide a valid URL'
    }
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
