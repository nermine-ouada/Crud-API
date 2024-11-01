const express = require("express");
const {
  GetPostByIdContoller,
  GetAllPostsContoller,
  deletePostByIdContoller,
  updatePostByIdContoller,
  createPostContoller,
} = require("../controllers/postsController");
const postRouter = express.Router();

postRouter.post("/", createPostContoller);
postRouter.get("/:id", GetPostByIdContoller);
postRouter.get("/", GetAllPostsContoller);
postRouter.delete("/:id", deletePostByIdContoller);
postRouter.put("/:id", updatePostByIdContoller);

module.exports = postRouter;
