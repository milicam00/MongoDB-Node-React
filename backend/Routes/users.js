import express from "express";
const router = express.Router();

import { registerUser, userLogin , updateUser, deleteUser, getUser, followUser, unfollowUser, getAllUsers, postLikeHistory, updateProfilePicture } from "../Controllers/user.js";
import { auth } from '../Middleware/auth.js';

//Register a user: 
router.post('/register', registerUser);

//Try to login as user: 
router.post('/login', userLogin);

// //Update user:
router.put('/:id', auth, updateUser);

//Delete user:
router.delete('/:id', auth, deleteUser);

//Get user:
router.get('/:id', getUser);

//Add to friend list:
router.put('/:id/follow', auth, followUser);

//Remove from friend list:
router.put('/:id/unfollow', auth, unfollowUser);

//Return all users from database:
router.post('/all', getAllUsers);

//Return all posts user liked:
router.get('/:userId/liked', postLikeHistory);

//Update only profile picture:
router.put('/:userId/updateProfilePicture', auth, updateProfilePicture);


export default router;
