const Post = require("../Models/PostModel");  
// Importing the Post model so we can interact with the posts collection in MongoDB

exports.createPost = async (req, res) => {  
  try {

    const { title, body } = req.body;  
    // Pulling the title and body fields coming from the frontend request

    const post = new Post({
      title,
      body,
    });
    // Creating a new post document using the Post model

    const savedPost = await post.save();  
    // Saving the new post to the database (returns the saved post)

    return res.json({
      success: true,
      post: savedPost,
    });
    // Sending back a successful response with the saved post data

  } catch (err) {

    console.error(err);  
    // Log any error for debugging

    return res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
    // Inform the frontend that the request failed
  }
};

exports.getAllPosts = async(req,res) =>{
  try {

    const posts = await Post.find()
      .populate("likes")      // Fetch full user data for each user who liked the post
      .populate("comments")   // Fetch full comment data instead of just comment IDs
      .exec();                // Execute the query

    res.json({
      posts,
    });
    // Return all posts along with populated likes and comments

  } catch(err) {

    return res.status(500).json({
      success: false,
      message: "Failed to fetch post",
    });
    // Send error response if database fetch fails
  }
};
