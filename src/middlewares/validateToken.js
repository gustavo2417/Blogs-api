require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const validateToken = (token) => {
  try {
    const { data } = jwt.verify(token, secret);
    return data;
  } catch (err) {
  return false;
  }
};

const confirmToken = (req, res, next) => {
  const token = req.header('Authorization');
  const decoded = validateToken(token);

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  if (!decoded) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  return next();
};

module.exports = confirmToken;