// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Approve User
exports.approveUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User approved", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Reject User
exports.rejectUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User rejected", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Address
exports.addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.address = req.body.address;
    await user.save();
    res.json({ message: "Address added", address: user.address });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Address
exports.getAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Delivery Address Details
exports.addDeliveryAddress = async (req, res) => {
  try {
    const { personalDetails, deliveryAddress } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.orderAddress = {
      personalDetails,
      deliveryAddress,
    };

    await user.save();
    res.json({
      message: "Delivery address added successfully",
      orderAddress: user.orderAddress,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Address by User ID
exports.getAddressByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("orderAddress"); // Select only the address field
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Provider List (Admin Only)
exports.getProviderList = async (req, res) => {
  try {
    const providers = await User.find({ role: "provider" }).select("-password"); // Exclude password field
    if (!providers || providers.length === 0) {
      return res.status(404).json({ msg: "No providers found" });
    }
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User updated", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all users all data without password
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
