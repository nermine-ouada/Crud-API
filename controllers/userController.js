const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUserContoller = async (req, res) => {
  try {
    const { name, email,role, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
    });

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

const GetUserByIdContoller = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.json(error.message);
  }
};

const GetCurrentUserController=async(req,res)=>{
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_KEY);
  
    const user = await User.findById(decoded.id);
    res.json(user);
  }
  catch(error)
{
  res.json(error.message);
}}
// Get All Users Controller
const GetAllUsersContoller = async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.json(error.message);
  }
};

// Delete User by ID Controller
const deleteUserByIdContoller = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      status: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

// Update User by ID Controller
const updateUserByIdContoller = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password } = req.body;

    // Hash the password if it's provided for updating
    let updatedData = { name, email };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    }); // Exclude password

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    res.json(error.message);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email ,role: user.role}, // Payload
      process.env.JWT_KEY, // Secret key (store this in env variables)
      { expiresIn: "1h" } // Token expires in 1 hour
    );
    res.json({ status: "success", message: "Login successful", token });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  GetUserByIdContoller,
  GetAllUsersContoller,
  deleteUserByIdContoller,
  updateUserByIdContoller,
  createUserContoller,
  GetCurrentUserController,
  login,
};
