const { User } = require('../models');
const { newToken } = require('../auth/jwt.token');
// const { idUser } = require('../utils/authotizedId');

const login = async (email, password) => {
  if (!email || !password) {
    return { type: 'FIELDS_ARE_MISSING', message: 'Some required fields are missing' };
  }

  const verifyUser = await User.findOne({ where: { email, password } });

  if (!verifyUser) {
    return { type: 'USER_NOT_FOUND', message: 'Invalid fields' };
  }
  
  const { id } = verifyUser.dataValues;
  const payload = { email, id };

  const token = newToken(payload);
  
  return { type: null, message: token };
};

module.exports = {
  login,
};