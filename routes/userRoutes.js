const express = require("express");
const {
  GetUserByIdContoller,
  GetAllUsersContoller,
  deleteUserByIdContoller,
  updateUserByIdContoller,
  createUserContoller,
  login,
  GetCurrentUserController
} = require("../controllers/userController");
const userRouter = express.Router();
 const verifyToken = require("../middleware/authMiddleware");
const checkAdmin=require("../middleware/checkAdmin");
const checkUser = require("../middleware/checkUser");
const checkAdminOrUser=require("../middleware/checkUserOrAdmin");

userRouter.post("/", createUserContoller);
userRouter.post("/login/", login);

// Protected routes
userRouter.get("/me",verifyToken,checkUser,GetCurrentUserController); //user
userRouter.get("/:id", verifyToken,checkAdmin, GetUserByIdContoller); // admin
userRouter.get("/", verifyToken, checkAdminOrUser, GetAllUsersContoller); //amdin or iser
userRouter.delete("/:id", verifyToken, checkAdmin, deleteUserByIdContoller); //admin
userRouter.put("/:id", verifyToken, checkAdmin, updateUserByIdContoller); //admin

module.exports = userRouter;
