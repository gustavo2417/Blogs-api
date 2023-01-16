const { User } = require('../models');
const { newToken } = require('../auth/jwt.token');

const login = async (email, password) => {
  const verifyUser = await User.findOne({ where: { email, password } });

  if (!email || !password) {
    return { type: 'FIELDS_ARE_MISSING', message: 'Some required fields are missing' };
  }

  if (!verifyUser) {
    return { type: 'USER_NOT_FOUND', message: 'Invalid fields' };
  }

  const token = newToken(email);

  return { type: null, message: token };
};

module.exports = {
  login,
};