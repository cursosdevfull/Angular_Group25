const express = require("express");
const { loginController } = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/login", loginController);
authRouter.get("/hello", (_req, res) => {
  res.status(200).json({ message: "Hello from auth route!" });
});

module.exports = {
  authRouter,
};
