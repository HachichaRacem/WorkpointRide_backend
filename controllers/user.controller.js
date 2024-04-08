const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUserProfile = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User profile created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get user profile by ID
  const getUserProfileById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User profile not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update user profile by ID
  const updateUserProfileById = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(id, updates, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: 'User profile not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete user profile by ID
  const deleteUserProfileById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User profile not found' });
      }
  
      res.json({ message: 'User profile deleted successfully', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { registerUser, loginUser, getAllUsers, createUserProfile, getUserProfileById, updateUserProfileById, deleteUserProfileById};
