const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/env");
const { getUserByCredentials } = require("./auth.repository");

async function login({ email, password }) {
  const user = await getUserByCredentials({ email, password });

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
