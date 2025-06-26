const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { sendEmailVerification } = require("../../../utils/emailUtils");

// Register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    user = await User.create({ name, email, password });

    // Optionally send email verification
    await sendEmailVerification(user);

    sendTokenResponse(user, 201, res);
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Logout
exports.logoutUser = (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ success: true, data: {} });
};

// Utility
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

  // Prevent updating protected fields
  delete updates._id;
  // Optionally, prevent users from updating their own role
  if (req.user.role !== "admin") {
    delete updates.role;
  }

  try {
    // Only allow if admin or the user is updating their own profile
    if (req.user.role !== "admin" && req.user.id !== id) {
      return res
        .status(403)
        .json({ success: false, error: "Not authorized to update this user" });
    }

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    await user.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.assignRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Only allow valid roles
    if (!["user", "admin", "creator", "editor"].includes(role)) {
      return res.status(400).json({ success: false, error: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
