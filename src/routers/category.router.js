const express = require('express');
const { create, getAll } = require('../controllers/category.controller');
const { validateName } = require('../middlewares/validateCategory');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateToken, validateName, create);
router.get('/', validateToken, getAll);

module.exports = router;