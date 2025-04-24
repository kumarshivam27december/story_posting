const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();

// Import Models
const Post = require('./models/Post'); // Adjust path as necessary
const User = require('./models/User'); // Adjust path as necessary

// Setup view engine and middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session management
app.use(session({
  secret: 'your-secret-key', // Change this to a more secure secret
  resave: false,
  saveUninitialized: false
}));

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    res.redirect('/login');
  }
}

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin123@blog1.di9o5df.mongodb.net/?retryWrites=true&w=majority&appName=blog1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Home route
app.get('/', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.render('home', { posts: posts, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading posts");
  }
});

// Compose route (ensure that the post has an author)
app.get('/compose', isAuthenticated, (req, res) => {
  res.render('compose', { user: req.session.user });
});

app.post('/compose', isAuthenticated, async (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postContent,
    author: req.session.user.email // Save the logged-in user's email as author
  });

  try {
    await post.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving post");
  }
});

// Post details route
app.get('/posts/:postId', async (req, res) => {
  const requestedPostId = req.params.postId;

  try {
    const post = await Post.findOne({ _id: requestedPostId });
    if (post) {
      res.render('post', { post: post, user: req.session.user });
    } else {
      res.status(404).send('Post not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading post");
  }
});

// Register route
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword
    });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
});

// Login route
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && await user.comparePassword(req.body.password)) {
      req.session.user = user; // Set user in session
      res.redirect('/');
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Server setup
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
