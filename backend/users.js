// backend/users.js
import db from './db.js';

// Register user
function registerUser({ username, email, password }, callback) {
  const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

  db.run(query, [username, email, password], function (err) {
    if (err) return callback(err);
    return callback(null, { id: this.lastID, username, email });
  });
}

// Find user by email
function findUserByEmail(email, callback) {
  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], (err, row) => {
    if (err) return callback(err);
    callback(null, row);
  });
}

export {
  registerUser,
  findUserByEmail
};
