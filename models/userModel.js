const db = require("../database/db");

// Get all users
exports.getAllUsers = (query, callback) => {
  let sql = "SELECT * FROM users";

  const conditions = [];
  const params = [];

  // Search
  if (query.search) {
    conditions.push("LOWER(name) LIKE ?");
    params.push(`%${query.search.toLowerCase()}%`);
  }

  if (conditions.length) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  // Sort
  if (query.sort) {
    const order =
      query.order && query.order.toUpperCase() === "DESC"
        ? "DESC"
        : "ASC";

    sql += ` ORDER BY ${query.sort} ${order}`;
  }

  db.all(sql, params, callback);
};


// Get user by ID
exports.getUserById = (id, callback) => {
  db.get(
    "SELECT * FROM users WHERE id = ?",
    [id],
    callback
  );
};


// Create user
exports.createUser = (user, callback) => {
  db.run(
    `INSERT INTO users (id, name, email, age)
     VALUES (?, ?, ?, ?)`,
    [user.id, user.name, user.email, user.age],
    callback
  );
};


// Update user
exports.updateUser = (id, user, callback) => {
  db.run(
    `UPDATE users
     SET name = ?, email = ?, age = ?
     WHERE id = ?`,
    [user.name, user.email, user.age, id],
    callback
  );
};


// Delete user
exports.deleteUser = (id, callback) => {
  db.run(
    "DELETE FROM users WHERE id = ?",
    [id],
    callback
  );
};