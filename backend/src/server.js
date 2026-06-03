const { app } = require("./app");
const { PORT } = require("./config/env");
const { ensureDatabaseConnection } = require("./config/db");

async function startServer() {
  await ensureDatabaseConnection();

  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start backend", error);
  process.exit(1);
});
