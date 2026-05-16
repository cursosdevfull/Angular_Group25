const fs = require("fs/promises");
const { USERS_FILE } = require("../../config/env");

async function getUsers() {
  const raw = await fs.readFile(USERS_FILE, "utf-8");
  const users = JSON.parse(raw);

  if (!Array.isArray(users)) {
    throw new Error("Users file format is invalid");
  }

  return users;
}

module.exports = {
  getUsers,
};
