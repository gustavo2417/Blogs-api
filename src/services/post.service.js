const { BlogPost, User, Category } = require('../models');

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

module.exports = {
  getAll,
  getById,
  updatePost,
  deletePost,
};
