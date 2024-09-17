const mongoose = require('mongoose');

// Define the Post schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true // The author's email will be stored
  },
  date: {
    type: Date,
    default: Date.now // Automatically set the date to the current date
  }
});

// Create the Post model using the schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
