const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure the username is unique
    trim: true,   // Remove leading/trailing spaces
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username must be at most 30 characters long']
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique
    lowercase: true, // Convert email to lowercase
    match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Validate email format
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long']
  }
}, {
  versionKey: false  // Disable the __v field
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
