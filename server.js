const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/blogDB');
mongoose.connect('mongodb+srv://admin:admin@story.2nctmkl.mongodb.net/?retryWrites=true&w=majority&appName=story')

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Blog Post Schema
const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model('Post', postSchema);

// Routes
app.get('/', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.render('home', { posts: posts });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.post('/compose', async (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postContent
  });

  try {
    await post.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/posts/:postId', async (req, res) => {
  const requestedPostId = req.params.postId;

  try {
    const post = await Post.findOne({ _id: requestedPostId });
    res.render('post', {
      title: post.title,
      content: post.content
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start Server
const port = 5000 || 3001 || 3000||10000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
