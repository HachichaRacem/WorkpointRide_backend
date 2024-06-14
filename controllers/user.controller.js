const userService = require("../services/user.services");

exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.getUser(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("[USER]: %s", user);
    res.json(user);
  } catch (error) {
    console.log("[USER] : %s\n%s", error, error.stack);
    res.status(500).json({ error: error.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const newUser = await userService.registerUser(req.body);
    if (!newUser)
      return res.status(500).json({ error: "Could not create new user" });
    return res.json({ status: "Created", user: newUser });
  } catch (error) {
    console.log("[USER]: %s\n%s", error, error.stack);
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    res.json(await userService.loginUser(req.body));
  } catch (error) {
    console.log("[USER]: %s\n%s", error, error.stack);
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedMember = await userService.updateUser(req.params.id, req.body);
    if (!updatedMember)
      return res.status(404).json({ error: "No user was found with that ID" });
    return res.json({ status: "Updated", user: updatedUser });
  } catch (error) {
    console.log("[USER]: %s\n%s", error, error.stack);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ error: "No user was found with that ID" });
    return res.json({ status: "Deleted", user: deletedUser });
  } catch (error) {
    console.log("[USER]: %s\n%s", error, error.stack);
    res.status(400).json({ error: error.message });
  }
};
