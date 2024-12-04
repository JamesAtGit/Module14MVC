const express = require('express');
const { getPosts, getPost, createPost, createComment } = require('../controllers/blogController');
const { loginUser, logoutUser } = require('../controllers/authController');
const router = express.Router();

// Home page
router.get('/', getPosts);

// Single post page
router.get('/post/:id', getPost);

// Post comment
router.post('/post/:id/comment', createComment);

// Dashboard (user's posts)
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Login
router.post('/login', loginUser);

// Logout
router.get('/logout', logoutUser);

module.exports = router;
