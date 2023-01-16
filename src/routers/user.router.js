const express = require('express');
const { newUser, getUsers } = require('../controllers/user.controller');
const { validationFields, validationEmail } = require('../middlewares/validateUser');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validationEmail, validationFields, newUser);

router.get('/', validateToken, getUsers);

module.exports = router;