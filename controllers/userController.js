const { v4: uuidv4 } = require("uuid");

const User = require("../models/userModel");


// GET /users
exports.getUsers = (req, res) => {
  User.getAllUsers(req.query, (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    res.json(rows);
  });
};


// GET /users/:id
exports.getUserById = (req, res) => {
  User.getUserById(req.params.id, (err, row) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    if (!row) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(row);
  });
};


// POST /users
exports.createUser = (req, res) => {
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

  User.createUser(newUser, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to create user"
      });
    }

    res.status(201).json(newUser);
  });
};


// PUT /users/:id
exports.updateUser = (req, res) => {
  const { name, email, age } = req.body;

  User.updateUser(
    req.params.id,
    { name, email, age },
    function (err) {

      if (err) {
        return res.status(500).json({
          message: "Failed to update user"
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.json({
        message: "User updated"
      });
    }
  );
};


// DELETE /users/:id
exports.deleteUser = (req, res) => {

  User.deleteUser(
    req.params.id,
    function (err) {

      if (err) {
        return res.status(500).json({
          message: "Failed to delete user"
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.json({
        message: "User deleted"
      });
    }
  );
};