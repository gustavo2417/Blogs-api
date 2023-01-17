const { User } = require('../models');
const { newToken } = require('../auth/jwt.token');

const createUser = async (displayName, email, password, image) => {
  const verifyUser = await User.findOne({ where: { email } });

  if (verifyUser) {
    return { type: 'USER_ALREADY_EXISTS', message: 'User already registered' };
  }

  await User.create({ displayName, email, password, image });

  const token = newToken(email);

  return { type: null, message: token };
};

const getUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return { type: null, message: users };
};

const getById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return { type: 'USER_NOT_EXISTS', message: 'User does not exist' };
  }

  return { type: null, message: user };
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });

  return { type: null };
};
 
module.exports = {
    createUser,
    getUsers,
    getById,
    deleteUser,
};
