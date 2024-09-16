// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for users
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash password before saving the user
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the model based on the schema
const User = mongoose.model('User', userSchema);
module.exports = User;
