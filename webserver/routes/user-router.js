'use strict';

const express = require('express');
const multer = require('multer');
const getUserProfile = require('../controllers/user/get-user-profile.js');
const checkJwtToken = require('../controllers/session/check-jwt-token');
const updateUserProfile = require('../controllers/user/update-user-profile');
const uploadAvatar = require('../controllers/user/upload-avatar');
const createPost = require('../controllers/user/create-post');
const searchUser = require('../controllers/user/search-user');
const addFriendRequest = require('../controllers/user/friend-request');
const acceptFriendRequest = require('../controllers/user/accept-friend-request');
const getFriendRequests = require('../controllers/user/get-friend-requests');
const getFriends = require('../controllers/user/get-friends');
const postAtFriendsWall = require('../controllers/user/post-at-friends-wall');

const upload = multer();
const router = express.Router();

router.get('/user', checkJwtToken, getUserProfile);
router.put('/user', checkJwtToken, updateUserProfile);
router.post('/user/avatar', checkJwtToken, upload.single('avatar'), uploadAvatar);
router.post('/user/post', checkJwtToken, createPost);
router.get('/user/search', checkJwtToken, searchUser);
router.post('/user/friend-request', checkJwtToken, addFriendRequest);
router.post('/user/friend-request/accept', checkJwtToken, acceptFriendRequest);
router.get('/user/friend-request', checkJwtToken, getFriendRequests);
router.get('/user/get-friends', checkJwtToken, getFriends);
router.post('/user/wall', checkJwtToken, postAtFriendsWall);

module.exports = router;
