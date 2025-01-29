const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/getAll', postController.getAllPosts);
router.post('/create', postController.createPost);
router.put('/update/:id', postController.updatePost);
router.delete('/delete/:id', postController.deletePost);

module.exports = router;
