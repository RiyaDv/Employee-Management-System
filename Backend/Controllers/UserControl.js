const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const Employee = require("../Models/Employee");

const userAction = {
  // Register User
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      throw new Error("Please add all fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Send response
    res.json({
      username: newUser.username,
      email: newUser.email,
      id: newUser.id,
    });
  }),

  // Login User
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user =
      (await User.findOne({ email })) || (await Employee.findOne({ email }));

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid Credentials");
    }

    // Update Login Count
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { email: user.email, id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    // Send response
    res.json({
      message: "Login Successful",
      token,
      id: user._id,
      role: user.role || user.position,
      username: user.username,
      email: user.email,
    });
  }),

  // Profile
  profile: asyncHandler(async (req, res) => {
    const user =
      (await User.findById(req.user.id).select("-password")) ||
      (await Employee.findById(req.user.id).select("-password"));

    if (!user) {
      throw new Error("User not found");
    }

    res.json({ user });
  }),

  // Admin
  admin: asyncHandler(async (req, res) => {
    const user =
      (await User.findById(req.user.id).select("-password")) ||
      (await Employee.findById(req.user.id).select("-password"));

    if (!user) {
      throw new Error("User not found");
    }

    res.json({ user });
  }),
};

module.exports = userAction;
