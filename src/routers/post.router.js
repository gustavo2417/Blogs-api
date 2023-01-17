const express = require('express');
const { 
    getAllPosts, 
    getPostById, 
    updatePost, 
    deletePost,
} = require('../controllers/post.controller');

const validateToken = require('../middlewares/validateToken');
const { validatePost } = require('../middlewares/validatePost');

const router = express.Router();

router.get('/', validateToken, getAllPosts);
router.get('/:id', validateToken, getPostById);
router.put('/:id', validateToken, validatePost, updatePost);
router.delete('/:id', validateToken, deletePost);

module.exports = router;