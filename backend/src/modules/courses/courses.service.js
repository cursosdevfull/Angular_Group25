const {
    findAllCourses,
    findCoursesPaginated,
    findCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
} = require("./courses.repository");

function getCourses() {
    return findAllCourses();
}

function getCoursesPaginated(params) {
    return findCoursesPaginated(params);
}

function getCourse(id) {
    return findCourseById(id);
}

function createCourseRecord(course) {
    return createCourse(course);
}

function updateCourseRecord(id, course) {
    return updateCourse(id, course);
}

function deleteCourseRecord(id) {
    return deleteCourse(id);
}

module.exports = {
    getCourses,
    getCoursesPaginated,
    getCourse,
    createCourseRecord,
    updateCourseRecord,
    deleteCourseRecord,
};