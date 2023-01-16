const express = require('express');
const { newUser, getUsers, getById } = require('../controllers/user.controller');
const { validationFields, validationEmail } = require('../middlewares/validateUser');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validationEmail, validationFields, newUser);

router.get('/', validateToken, getUsers);

router.get('/:id', validateToken, getById);

module.exports = router;