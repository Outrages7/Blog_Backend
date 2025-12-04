const Post = require("../Models/PostModel");
const Comment = require("../Models/CommentModel");

exports.createComment = async (req, res) => {
  try {
    const { user, post, body } = req.body;

    const comment = new Comment({
      post,
      user,
      body,
    });

    const savedComment = await comment.save();

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    )
      .populate("comments")
      .exec();

    res.json({
      success: true,
      post: updatedPost,
      message: `Blog added by ${user}`,
    });
  } catch (error) {
    console.log("Got error in Comment Controller:", error);

    return res.status(500).json({
      success: false,
      message: "Got error in Comment Controller",
    });
  }
};
