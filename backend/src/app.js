const express = require("express");
const cors = require("cors");
const { authRouter } = require("./modules/auth/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/auth", authRouter);

module.exports = {
  app,
};
