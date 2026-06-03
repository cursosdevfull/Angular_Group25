const express = require("express");
const cors = require("cors");
const { authRouter } = require("./modules/auth/auth.routes");
const { usersRouter } = require("./modules/users/users.routes");
const { coursesRouter } = require("./modules/courses/courses.routes");
const { requireAuth } = require("./middlewares/auth.middleware");

const app = express();
const apiRouter = express.Router();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", requireAuth, usersRouter);
apiRouter.use("/courses", requireAuth, coursesRouter);

app.use("/api", apiRouter);

module.exports = {
  app,
};
