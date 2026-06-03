const { pool } = require("../../config/db");

async function findAllUsers() {
    const [rows] = await pool.execute(
        `SELECT id, email, name, created_at, updated_at
     FROM users
     ORDER BY id ASC`
    );

    return rows;
}

async function findUserById(id) {
    const [rows] = await pool.execute(
        `SELECT id, email, name, created_at, updated_at
     FROM users
     WHERE id = ?
     LIMIT 1`,
        [id]
    );

    return rows[0] ?? null;
}

async function createUser({ email, password, name }) {
    const [result] = await pool.execute(
        `INSERT INTO users (email, password, name)
     VALUES (?, ?, ?)`,
        [email, password, name]
    );

    return findUserById(result.insertId);
}

async function updateUser(id, { email, password, name }) {
    const [result] = await pool.execute(
        `UPDATE users
     SET email = ?, password = ?, name = ?
     WHERE id = ?`,
        [email, password, name, id]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return findUserById(id);
}

async function deleteUser(id) {
    const [result] = await pool.execute(
        `DELETE FROM users
     WHERE id = ?`,
        [id]
    );

    return result.affectedRows > 0;
}

module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser,
};