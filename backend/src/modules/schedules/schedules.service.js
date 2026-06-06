const {
    findAllSchedules,
    findSchedulesPaginated,
    findScheduleById,
    existsCourseById,
    createSchedule,
    updateSchedule,
    deleteSchedule,
} = require("./schedules.repository");

function getSchedules() {
    return findAllSchedules();
}

function getSchedulesPaginated(params) {
    return findSchedulesPaginated(params);
}

function getSchedule(id) {
    return findScheduleById(id);
}

function courseExists(id) {
    return existsCourseById(id);
}

function createScheduleRecord(schedule) {
    return createSchedule(schedule);
}

function updateScheduleRecord(id, schedule) {
    return updateSchedule(id, schedule);
}

function deleteScheduleRecord(id) {
    return deleteSchedule(id);
}

module.exports = {
    getSchedules,
    getSchedulesPaginated,
    getSchedule,
    courseExists,
    createScheduleRecord,
    updateScheduleRecord,
    deleteScheduleRecord,
};