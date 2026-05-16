const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/env");
const { getUsers } = require("./auth.repository");

async function login({ email, password }) {
  const users = await getUsers();
  const user = users.find((item) => item.email === email && item.password === password);

  if (!user) {
    return null;
  }

  const accessToken = jwt.sign(
    {
      name: user.name,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    accessToken,
  };
}

module.exports = {
  login,
};
