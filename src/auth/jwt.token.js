require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = { expiresIn: '30min', algorithm: 'HS256' };

const newToken = (user) => {
  const token = jwt.sign({ data: user }, secret, jwtConfig);

  return token;
};

module.exports = { newToken };