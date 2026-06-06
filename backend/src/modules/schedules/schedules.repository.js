const { pool } = require("../../config/db");

async function findAllSchedules() {
    const [rows] = await pool.execute(
        `SELECT s.id,
                s.title,
                s.date_start AS dateStart,
                s.duration,
                s.price,
                s.course_id AS courseId,
                c.name AS courseName
         FROM schedules s
         INNER JOIN courses c ON c.id = s.course_id
         ORDER BY s.id ASC`
    );

    return rows;
}

async function findSchedulesPaginated({ page, limit }) {
    const offset = (page - 1) * limit;

    const [[countRow]] = await pool.execute(
        `SELECT COUNT(*) AS total
         FROM schedules`
    );

    const [rows] = await pool.query(
        `SELECT s.id,
                s.title,
                s.date_start AS dateStart,
                s.duration,
                s.price,
                s.course_id AS courseId,
                c.name AS courseName
         FROM schedules s
         INNER JOIN courses c ON c.id = s.course_id
         ORDER BY s.id ASC
         LIMIT ${limit} OFFSET ${offset}`
    );

    return {
        data: rows,
        total: countRow.total,
    };
}

async function findScheduleById(id) {
    const [rows] = await pool.execute(
        `SELECT s.id,
                s.title,
                s.date_start AS dateStart,
                s.duration,
                s.price,
                s.course_id AS courseId,
                c.name AS courseName
         FROM schedules s
         INNER JOIN courses c ON c.id = s.course_id
         WHERE s.id = ?
         LIMIT 1`,
        [id]
    );

    return rows[0] ?? null;
}

async function existsCourseById(courseId) {
    const [rows] = await pool.execute(
        `SELECT id
         FROM courses
         WHERE id = ?
         LIMIT 1`,
        [courseId]
    );

    return rows.length > 0;
}

async function createSchedule({ title, dateStart, duration, price, courseId }) {
    const [result] = await pool.execute(
        `INSERT INTO schedules (title, date_start, duration, price, course_id)
         VALUES (?, ?, ?, ?, ?)`,
        [title, dateStart, duration, price, courseId]
    );

    return findScheduleById(result.insertId);
}

async function updateSchedule(id, { title, dateStart, duration, price, courseId }) {
    const [result] = await pool.execute(
        `UPDATE schedules
         SET title = ?,
             date_start = ?,
             duration = ?,
             price = ?,
             course_id = ?
         WHERE id = ?`,
        [title, dateStart, duration, price, courseId, id]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return findScheduleById(id);
}

async function deleteSchedule(id) {
    const [result] = await pool.execute(
        `DELETE FROM schedules
         WHERE id = ?`,
        [id]
    );

    return result.affectedRows > 0;
}

module.exports = {
    findAllSchedules,
    findSchedulesPaginated,
    findScheduleById,
    existsCourseById,
    createSchedule,
    updateSchedule,
    deleteSchedule,
};