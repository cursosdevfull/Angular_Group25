const { pool } = require("../../config/db");

async function getUserByCredentials({ email, password }) {
  const [rows] = await pool.execute(
    `SELECT id, email, password, name
     FROM users
     WHERE email = ? AND password = ?
     LIMIT 1`,
    [email, password]
  );

  return rows[0] ?? null;
}

module.exports = {
  getUserByCredentials,
};
