const postService = require('../services/post.service');

const getAllPosts = async (_req, res) => {
  const { message } = await postService.getAll();

  res.status(200).json(message);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postService.getById(id);

  if (type) {
    return res.status(404).json({ message });
  }
  
  res.status(200).json(message);
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const { id } = req.user;
  
  const { type, message } = await postService.updatePost(postId, { title, content }, id);

  if (type === 'POST_NOT_EXISTS') {
    return res.status(404).json({ message });
  }

  if (type === 'USER_UNAUTHORIZED') {
    return res.status(401).json({ message });
  }
  
  res.status(200).json(message);
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { id } = req.user;
  const { type, message } = await postService.deletePost(postId, id);

  if (type === 'POST_NOT_EXISTS') {
    return res.status(404).json({ message });
  }

  if (type === 'USER_UNAUTHORIZED') {
    return res.status(401).json({ message });
  }

  return res.status(204).json();
};

const createPost = async (req, res) => {
  const userId = req.user.id;
  const { title, content, categoryIds } = req.body;
  const { type, message } = await postService.createPost({ title, content, userId, categoryIds });

  if (type) {
    return res.status(400).json({ message });
  }

  return res.status(201).json(message);
};

module.exports = {
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  createPost,
};