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

module.exports = {
  getAllPosts,
  getPostById,
};