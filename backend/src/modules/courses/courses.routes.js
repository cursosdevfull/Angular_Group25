const express = require("express");
const {
    listCoursesController,
    listCoursesPaginatedController,
    getCourseController,
    createCourseController,
    updateCourseController,
    deleteCourseController,
} = require("./courses.controller");

const coursesRouter = express.Router();

coursesRouter.get("/", listCoursesController);
coursesRouter.get("/pagination", listCoursesPaginatedController);
coursesRouter.get("/:id", getCourseController);
coursesRouter.post("/", createCourseController);
coursesRouter.put("/:id", updateCourseController);
coursesRouter.delete("/:id", deleteCourseController);

module.exports = {
    coursesRouter,
};