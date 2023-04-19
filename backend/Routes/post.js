import express from "express";
const router = express.Router();

import { auth } from "../Middleware/auth.js";
import { createPost, updatePost, deletePost, donateToPost, getPost , getAllPosts , friendPosts, getAllDonationsByCategory, latestDonations } from "../Controllers/post.js";


//Create a post:
router.post('/', auth, createPost);

//Update post:
router.put('/:id', auth, updatePost);

//Delete post:
router.delete('/:id', auth, deletePost);

//Donate to post:
router.put('/:id/donate', auth, donateToPost);

//Find post:
router.get('/:id', getPost);

//Return all posts of this user:
router.get('/:id/posts', getAllPosts);

//Return all posts from my friends list:
router.post('/timeline', friendPosts);

//Return all donations with category/es?:
router.post('/filter', getAllDonationsByCategory);

//Return latest 10 donations:
router.post('/latest', latestDonations);


export default router;