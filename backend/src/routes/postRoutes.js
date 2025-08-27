import { Router } from 'express';
import upload from '../middleware/upload.js';
import { createPost, getPosts, deletePost, showPost, generateLink } from '../controllers/postController.js';
import { toggleLike, getLikesByPost } from '../controllers/likeController.js';
import { ensureAuthenticated } from '../middleware/ensureAuth.js';

const router = Router();

// like/unlike a post
router.post('/like/:postId', ensureAuthenticated, toggleLike);

// get all likes for a post
router.get('/likes/:postId', ensureAuthenticated, getLikesByPost);

// Create a new post (removed userId from path)
router.post('/create', ensureAuthenticated, upload.single('media'), createPost);

// GET all posts for the authenticated user
router.get('/my-posts', ensureAuthenticated, getPosts);

// DELETE a post
router.delete('/delete/:postId', ensureAuthenticated, deletePost);

// Get a post by ID
router.get('/:postId', ensureAuthenticated, showPost);

// generate link for a post
router.get('/share/:postId', ensureAuthenticated, generateLink);

export default router;