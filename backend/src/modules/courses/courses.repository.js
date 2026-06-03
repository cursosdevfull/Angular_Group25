const { pool } = require("../../config/db");

async function findAllCourses() {
    const [rows] = await pool.execute(
        `SELECT id, name, level
     FROM courses
     ORDER BY id ASC`
    );

    return rows;
}

async function findCoursesPaginated({ page, limit }) {
    const offset = (page - 1) * limit;

    const [[countRow]] = await pool.execute(
        `SELECT COUNT(*) AS total
     FROM courses`
    );

    const [rows] = await pool.query(
        `SELECT id, name, level
     FROM courses
     ORDER BY id ASC
     LIMIT ${limit} OFFSET ${offset}`
    );

    return {
        data: rows,
        total: countRow.total,
    };
}

async function findCourseById(id) {
    const [rows] = await pool.execute(
        `SELECT id, name, level
     FROM courses
     WHERE id = ?
     LIMIT 1`,
        [id]
    );

    return rows[0] ?? null;
}

async function createCourse({ name, level }) {
    const [result] = await pool.execute(
        `INSERT INTO courses (name, level)
     VALUES (?, ?)`,
        [name, level]
    );

    return findCourseById(result.insertId);
}

async function updateCourse(id, { name, level }) {
    const [result] = await pool.execute(
        `UPDATE courses
     SET name = ?, level = ?
     WHERE id = ?`,
        [name, level, id]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return findCourseById(id);
}

async function deleteCourse(id) {
    const [result] = await pool.execute(
        `DELETE FROM courses
     WHERE id = ?`,
        [id]
    );

    return result.affectedRows > 0;
}

module.exports = {
    findAllCourses,
    findCoursesPaginated,
    findCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
};