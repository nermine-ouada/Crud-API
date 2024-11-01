const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "User email is required"],
    },
    role: {
      type: String,
      required: [true, "User role is required"],
      enum: ["user", "admin"], // Restrict the roles to either "user" or "admin"
    },
    password: {
      type: String,
      required: [true, "user password is required"],
    },
  },
  {
    timestamps: true,
  }
);

//compile the user model
const User = mongoose.model("User", userSchema);
module.exports = User;
