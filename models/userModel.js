const db = require("../database/db");


// GET all users
exports.getAllUsers = (query) => {
  let sql = "SELECT * FROM users";
  const params = [];

  // Search
  if (query.search) {
    sql += " WHERE LOWER(name) LIKE ?";
    params.push(`%${query.search.toLowerCase()}%`);
  }

  // Sort
  if (query.sort) {
    const order =
      query.order && query.order.toUpperCase() === "DESC"
        ? "DESC"
        : "ASC";

    sql += ` ORDER BY ${query.sort} ${order}`;
  }

  const stmt = db.prepare(sql);
  return stmt.all(params);
};


// GET user by ID
exports.getUserById = (id) => {
  const stmt = db.prepare(
    "SELECT * FROM users WHERE id = ?"
  );

  return stmt.get(id);
};


// CREATE user
exports.createUser = (user) => {
  const stmt = db.prepare(`
    INSERT INTO users (id, name, email, age)
    VALUES (?, ?, ?, ?)
  `);

  return stmt.run(
    user.id,
    user.name,
    user.email,
    user.age
  );
};


// UPDATE user
exports.updateUser = (id, user) => {
  const stmt = db.prepare(`
    UPDATE users
    SET name = ?, email = ?, age = ?
    WHERE id = ?
  `);

  return stmt.run(
    user.name,
    user.email,
    user.age,
    id
  );
};


// DELETE user
exports.deleteUser = (id) => {
  const stmt = db.prepare(
    "DELETE FROM users WHERE id = ?"
  );

  return stmt.run(id);
};