const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// User login
async function loginUser(params) {
  if (!params.email || !params.password) {
    throw Error("The request is missing the email or the password");
  }
  const user = await getUser(params.email);
  if (!user) {
    throw Error("No account was found with this email");
  }
  const isMatch = await bcrypt.compare(params.password, user.password);
  if (!isMatch) {
    throw Error("Invalid password or email");
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const refresh_token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return { user: user, accessToken: token, refreshToken: refresh_token };
}

// User register
async function registerUser(params) {
  if (
    !params.firstName ||
    !params.lastName ||
    !params.email ||
    !params.phoneNumber ||
    !params.password
  )
    throw Error("The request is missing one or more fields");

  const userAlreadyExists = await getUser(params.email);

  if (userAlreadyExists) throw Error("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(params.password, salt);

  const newUser = new UserModel({
    firstName: params.firstName,
    lastName: params.lastName,
    email: params.email,
    phoneNumer: params.phoneNumber,
    password: hashedPassword,
  });
  return await newUser.save();
}

// Updating existing user
async function updateUser(email, updates) {
  if (!email || !updates) throw Error("Missing parameters");
  return await UserModel.findOneAndUpdate({ email }, updates);
}

// Deleting existing user
async function deleteUser(email) {
  if (!email) throw Error("Invalid email entered");
  return await UserModel.findOneAndDelete({ email });
}

// Get user
async function getUser(email) {
  return await UserModel.findOne({ email });
}

module.exports = {
  registerUser,
  getUser,
  loginUser,
  deleteUser,
  updateUser,
};
