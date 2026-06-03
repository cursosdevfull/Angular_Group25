const express = require("express");
const {
    listUsersController,
    getUserController,
    createUserController,
    updateUserController,
    deleteUserController,
} = require("./users.controller");

const usersRouter = express.Router();

usersRouter.get("/", listUsersController);
usersRouter.get("/:id", getUserController);
usersRouter.post("/", createUserController);
usersRouter.put("/:id", updateUserController);
usersRouter.delete("/:id", deleteUserController);

module.exports = {
    usersRouter,
};