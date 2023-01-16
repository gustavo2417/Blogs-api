const userService = require('../services/user.service');

const newUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { type, message } = await userService.createUser(displayName, email, password, image);

  if (type) {
    return res.status(409).json({ message });
  }

  return res.status(201).json({ token: message });
};

const getUsers = async (_req, res) => {
  const { message } = await userService.getUsers();

  return res.status(200).json(message);
};

module.exports = {
  newUser,
  getUsers,
};