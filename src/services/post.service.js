const { BlogPost, User, Category, PostCategory } = require('../models');

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { type: null, message: posts };
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  
  if (!post) {
    return { type: 'POST_NOT_EXISTS', message: 'Post does not exist' };
  }
  
  return { type: null, message: post };  
};

const updatePost = async (id, update, userId) => {
  const post = await BlogPost.findByPk(id);
  
  if (!post) { 
    return { type: 'POST_NOT_EXISTS', message: 'Post does not exist' };
  }
  
  if (userId !== post.userId) { 
    return { type: 'USER_UNAUTHORIZED', message: 'Unauthorized user' };
  }
    
  await BlogPost.update(update, { where: { id } });
    
  const postUpdated = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
    
  return { type: null, message: postUpdated };
};

const deletePost = async (id, userId) => {
  const post = await BlogPost.findByPk(id);

  if (!post) { 
    return { type: 'POST_NOT_EXISTS', message: 'Post does not exist' };
  }
  
  if (userId !== post.userId) { 
    return { type: 'USER_UNAUTHORIZED', message: 'Unauthorized user' };
  }

  await BlogPost.destroy({ where: { id } });

  return { type: null };
};

const createPost = async ({ title, content, userId, categoryIds }) => {
  const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });

  if (count !== categoryIds.length || categoryIds.length === 0) {
    return { type: 'Category not found', message: 'one or more "categoryIds" not found' };
  }

  const { dataValues } = await BlogPost.create({ title, content, userId });

  const Postcategories = categoryIds.map((ids) => ({ postId: dataValues.id, categoryId: ids }));

  await PostCategory.bulkCreate(Postcategories);

  return { type: null, message: dataValues }; 
};

module.exports = {
  getAll,
  getById,
  updatePost,
  deletePost,
  createPost,
};
