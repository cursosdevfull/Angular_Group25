const express = require("express");
const {
    listSchedulesController,
    listSchedulesPaginatedController,
    getScheduleController,
    createScheduleController,
    updateScheduleController,
    deleteScheduleController,
} = require("./schedules.controller");

const schedulesRouter = express.Router();

schedulesRouter.get("/", listSchedulesController);
schedulesRouter.get("/pagination", listSchedulesPaginatedController);
schedulesRouter.get("/:id", getScheduleController);
schedulesRouter.post("/", createScheduleController);
schedulesRouter.put("/:id", updateScheduleController);
schedulesRouter.delete("/:id", deleteScheduleController);

module.exports = {
    schedulesRouter,
};