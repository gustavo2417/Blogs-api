const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });

  return { type: null, message: newCategory };
};

const getCategories = async () => {
  const allCategories = await Category.findAll();
  
  return { type: null, message: allCategories };
};

module.exports = {
  createCategory,
  getCategories,
};