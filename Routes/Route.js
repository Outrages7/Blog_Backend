const express = require("express");
const router = express.Router();

const { createComment } = require("../Controllers/CommentController");
const { createPost, getAllPosts } = require("../Controllers/PostController");
const { likepost, unlikepost } = require("../Controllers/LikeController");

router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);
router.post("/posts/like", likepost);
router.post("/posts/unlike", unlikepost);

module.exports = router;
