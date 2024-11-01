const Post = require("../model/Post");

const createPostContoller = async (req, res) => {
  try {
    //create post
    const { title, description, photo } = req.body;

    const post = await Post.create({
      title,
      description,
      photo,
    });

    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    res.json(error.message);
  }
};

const GetPostByIdContoller = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);

    res.json(post);
  } catch (error) {
    res.json(error.message);
  }
};
const GetAllPostsContoller = async (req, res) => {
  try {
    const posts = await Post.find();

    res.json(posts)
   
  } catch (error) {
    res.json(error.message);
  }
};
const deletePostByIdContoller = async (req, res) => {
  try {
    const id = req.params.id;
    const postData= await Post.findById(id);
    const post = await Post.findByIdAndDelete(id);
    res.json({
      status: "post deleted succesfully",
      data: postData
    });
  } catch (error) {
    res.json(error.message);
  }
};
const updatePostByIdContoller = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, photo } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description, photo },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({
      status: "success",
      data: updatedPost,
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  GetPostByIdContoller,
  GetAllPostsContoller,
  deletePostByIdContoller,
  updatePostByIdContoller,
  createPostContoller,
};
