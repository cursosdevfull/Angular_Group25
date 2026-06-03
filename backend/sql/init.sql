CREATE DATABASE IF NOT EXISTS course_db;
USE course_db;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(150) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(120) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
);

INSERT INTO users (email, password, name)
VALUES
  ('admin@backoffice.com', 'Admin1234', 'Admin User'),
  ('manager@backoffice.com', 'Manager123', 'Manager User'),
  ('sales@backoffice.com', 'Sales1234', 'Sales User')
ON DUPLICATE KEY UPDATE
  password = VALUES(password),
  name = VALUES(name);

CREATE TABLE IF NOT EXISTS courses (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  level VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_courses_name_level (name, level)
);

INSERT INTO courses (name, level)
VALUES
  ('Angular Fundamentals', 'Beginner'),
  ('Node API Design', 'Intermediate'),
  ('Architecture Patterns', 'Advanced')
ON DUPLICATE KEY UPDATE
  level = VALUES(level);