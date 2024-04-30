//const User = require('../models/user.model');

const userService = require("../services/user.services");
const express = require("express");
const router = express.Router();

// Fetches user by email
// USAGE: API_URL/api/users/getUser/example@example.com
router.get("/getUser/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await userService.getUser(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log("[USER] : %s\n%s", error, error.stack);
    res.status(500).json({ error: error.message });
  }
});

// Registers new user
// UASGE: API_URL/api/users/register
router.post("/register", async (req, res) => {
  try {
    const newUser = await userService.registerUser(req.body);
    if (!newUser)
      return res.status(500).json({ error: "Could not create new user" });
    return res.json({ status: "Created", user: newUser });
  } catch (error) {
    console.log("[USER]: %s\n%s", error, error.stack);
    res.status(500).json({ error: error.message });
  }
});

// Logs existing user in
// USAGE: API_URL/api/users/login
router.post("/login", async (req, res) => {
  try {
    res.json(await userService.loginUser(req.body));
  } catch (error) {
    console.log("[USER]: %s\n%s", error, error.stack);
    res.status(400).json({ error: error.message });
  }
});

// Updates existing user
// API_URL/api/users/example@example.com
router.put("/:email", async (req, res) => {
  try {
    const updatedMember = await userService.updateUser(
      req.params.email,
      req.body
    );
    if (!updatedMember)
      return res
        .status(404)
        .json({ error: "No user was found with that email" });
    return res.json({ status: "Updated", user: updatedUser });
  } catch (error) {
    console.log("[USER]: %s\n%s", error, error.stack);
    res.status(400).json({ error: error.message });
  }
});

// Deletes an existing user
// USAGE: API_URL/api/users/exmaple@example.com
router.delete("/:email", async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.body);
    if (!deletedUser)
      return res
        .status(404)
        .json({ error: "No user was found with that email" });
    return res.json({ status: "Deleted", user: deletedUser });
  } catch (error) {
    console.log("[USER]: %s\n%s", error, error.stack);
    res.status(400).json({ error: error.message });
  }
});

/*
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
  };*/

//module.exports = { registerUser, loginUser, getAllUsers, createUserProfile, getUserProfileById, updateUserProfileById, deleteUserProfileById};
module.exports = router;
