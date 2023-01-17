const express = require('express');
const { getAllPosts, getPostById } = require('../controllers/post.controller');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/', validateToken, getAllPosts);
router.get('/:id', validateToken, getPostById);

module.exports = router;