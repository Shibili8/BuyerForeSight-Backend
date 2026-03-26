const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../users.db");

const db = new Database(dbPath);

// Create table
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    age INTEGER
  )
`).run();

module.exports = db;