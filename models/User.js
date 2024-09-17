const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures that no two users have the same email
  },
  password: {
    type: String,
    required: true,
  },
});

// Method to compare provided password with the hashed password in the database
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
