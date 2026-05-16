const { login } = require("./auth.service");

async function loginController(req, res) {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const result = await login({ email, password });

    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  loginController,
};
