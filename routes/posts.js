const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const {authenticateToken} = require('../middleware/auth');

router.get('/getAllPostByUser/:id', authenticateToken, postController.getAllPostsByUser);
router.post('/create', authenticateToken, postController.createPost);
router.post('/update/:id', authenticateToken, postController.updatePost);
router.delete('/delete/:id', authenticateToken, postController.deletePost);

router.get(
  '/getAllPostsByUserFiltered/:id',
  authenticateToken,
  postController.getAllPostsByUserFiltered,
);

module.exports = router;
