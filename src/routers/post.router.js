const express = require('express');
const { 
    getAllPosts, 
    getPostById, 
    updatePost, 
    deletePost,
    createPost,
} = require('../controllers/post.controller');

const validateToken = require('../middlewares/validateToken');
const { validatePost, validateBlogPost } = require('../middlewares/validatePost');

const router = express.Router();

router.get('/', validateToken, getAllPosts);
router.get('/:id', validateToken, getPostById);
router.put('/:id', validateToken, validatePost, updatePost);
router.delete('/:id', validateToken, deletePost);
router.post('/', validateToken, validateBlogPost, createPost);

module.exports = router;