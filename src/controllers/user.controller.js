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

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.getById(id);

  if (type) {
    return res.status(404).json({ message });
  }

  return res.status(200).json(message);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  await userService.getById(id);

  return res.status(204).json();
};

module.exports = {
  newUser,
  getUsers,
  getById,
  deleteUser,
};