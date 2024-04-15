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
    const refresh_token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({ token,refresh_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.refreshToken = async (req, res) => {
  const refresh_token = req.body.refreshToken;
  if (!refresh_token) {
    res.status(401).json({
      errors: "Token not found",
    });
  }
  try {
    await jwt.verify(
      refresh_token,
      "_JWT_SECRET_REFRESH_CODE",
      async (err, verifToken) => {
        if (err) {
          return res.status(401).json("Invalid or expired token");
        } else {
          var t = await BlackList.findOne({ token: refresh_token });
          if (t) {
            return res.status(403).json("Invalid token");
          }
          const id = verifToken.id;
          User.findById(id).exec((err, user) => {
            if (err || !user) {
              return res.status(400).json({
                errors: "User not found.",
              });
            }
            if (user && user.isBlocked) {
              return res.status(400).json({
                errors: "Connection denied ! Your account is disabled",
              });
            }
            const token = jwt.sign(
              {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role,
                isBlocked: user.isBlocked,
                
              },
              "_JWT_SECRET_CODE",
              {
                expiresIn: "3600s",
              }
            );
            const refresh_token = jwt.sign(
              {
                id: user._id,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "1d",
              }
            );
            User.updateOne(
              {
                _id: user._id,
              },
              {
                last_connection: moment().format(),
              }
            )
              .then(() => {
                console.log("updated");
              })
              .catch((e) => {
                console.log(e);
              });
            return res.json({
              token,
              refresh_token,
            });
          });
        }
      }
    );
  } catch (e) {
    return res.status(400).json({
      errors: e,
    });
  }
}

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

  // Refresh token function
const refreshToken = async (req, res) => {
  const refresh_token = req.body.refreshToken;
  if (!refresh_token) {
    return res.status(401).json({ errors: "Token not found" });
  }

  try {
    jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_SECRET,
      async (err, verifToken) => {
        if (err) {
          return res.status(401).json("Invalid or expired token");
        } else {
          const id = verifToken.id;
          const user = await User.findById(id);
          if (!user) {
            return res.status(400).json({ errors: "User not found." });
          }
          if (user.isBlocked) {
            return res.status(400).json({ errors: "Connection denied! Your account is disabled" });
          }
          const token = jwt.sign(
            {
              id: user._id,
              firstname: user.firstname,
              lastname: user.lastname,
              role: user.role,
              isBlocked: user.isBlocked,
            },
            process.env.JWT_SECRET,
            { expiresIn: "3600s" }
          );
          const new_refresh_token = await generateRefreshToken(user._id);
          await User.updateOne({ _id: user._id }, { last_connection: new Date() });
          return res.json({ token, refresh_token: new_refresh_token });
        }
      }
    );
  } catch (e) {
    return res.status(400).json({ errors: e });
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
