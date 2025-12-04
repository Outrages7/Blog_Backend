const Post = require("../Models/PostModel");
const Like = require("../Models/LikeModel");
const { json } = require("express");

exports.likepost = async (req, res) => {
  try {
    const { post, user } = req.body;

    const like = new Like({
      post,
      user,
    });

    const savedLike = await like.save();

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true }
    );

    res.json({
      post: updatedPost,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed in Like Controller",
    });
  }
};

exports.unlikepost = async (req, res) => {
  try {
    const { post, likeId } = req.body;

    const removedLike = await Like.findByIdAndDelete(likeId);

    if (!removedLike) {
      return res.json({
        success: false,
        message: "Like not found",
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: likeId } },
      { new: true }
    );

    res.json({
      post: updatedPost,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed in Unlike Controller",
    });
  }
};
