const path = require("path");

const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const USERS_FILE = path.resolve(__dirname, "..", "data", "users.json");

module.exports = {
  PORT,
  JWT_SECRET,
  USERS_FILE,
};
