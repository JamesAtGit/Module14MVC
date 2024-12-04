const { Post, Comment } = require('../models');

// Display all blog posts
const getPosts = async (req, res) => {
  const posts = await Post.findAll({ include: [User] });
  res.render('home', { posts });
};

// Display a single post with comments
const getPost = async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    include: [User, { model: Comment, include: [User] }],
  });
  res.render('singlePost', { post });
};

// Create a new post
const createPost = async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id,
  });
  res.redirect('/dashboard');
};

// Add a comment to a post
const createComment = async (req, res) => {
  const comment = await Comment.create({
    comment_text: req.body.comment_text,
    post_id: req.params.id,
    user_id: req.session.user_id,
  });
  res.redirect(`/post/${req.params.id}`);
};

module.exports = { getPosts, getPost, createPost, createComment };
