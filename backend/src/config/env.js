const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_PORT = Number(process.env.DB_PORT) || 3306;
const DB_NAME = process.env.DB_NAME || "course_db";
const DB_USER = process.env.DB_USER || "user-course";
const DB_PASSWORD = process.env.DB_PASSWORD || "12345";

module.exports = {
  PORT,
  JWT_SECRET,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
};
