const categoryService = require('../services/category.service');

const create = async (req, res) => {
  const { name } = req.body;
  const { message } = await categoryService.createCategory(name);

  return res.status(201).json(message);
};

const getAll = async (_req, res) => {
  const { message } = await categoryService.getCategories();

  return res.status(200).json(message);
};

module.exports = {
  create,
  getAll,
};