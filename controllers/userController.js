const { v4: uuidv4 } = require("uuid");
const User = require("../models/userModel");


// GET users
exports.getUsers = (req, res) => {
  try {
    const users = User.getAllUsers(req.query);
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Database error"
    });
  }
};


// GET user by ID
exports.getUserById = (req, res) => {
  try {
    const user = User.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({
      message: "Database error"
    });
  }
};


// CREATE user
exports.createUser = (req, res) => {
  try {

    const { name, email, age } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and Email required"
      });
    }

    const newUser = {
      id: uuidv4(),
      name,
      email,
      age
    };

    User.createUser(newUser);

    res.status(201).json(newUser);

  } catch (err) {
    res.status(500).json({
      message: "Failed to create user"
    });
  }
};


// UPDATE user
exports.updateUser = (req, res) => {

  try {

    const result = User.updateUser(
      req.params.id,
      req.body
    );

    if (result.changes === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User updated"
    });

  } catch (err) {

    res.status(500).json({
      message: "Failed to update user"
    });

  }
};


// DELETE user
exports.deleteUser = (req, res) => {

  try {

    const result = User.deleteUser(
      req.params.id
    );

    if (result.changes === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User deleted"
    });

  } catch (err) {

    res.status(500).json({
      message: "Failed to delete user"
    });

  }
};