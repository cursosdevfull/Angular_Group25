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

CREATE TABLE IF NOT EXISTS schedules (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(180) NOT NULL,
  date_start DATETIME NOT NULL,
  duration INT UNSIGNED NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  course_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_schedules_title_start_course (title, date_start, course_id),
  KEY idx_schedules_course_id (course_id),
  CONSTRAINT fk_schedules_courses
    FOREIGN KEY (course_id)
    REFERENCES courses (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

INSERT INTO schedules (title, date_start, duration, price, course_id)
VALUES
  ('Angular Fundamentals - Morning', '2026-07-01 09:00:00', 120, 49.99, (SELECT id FROM courses WHERE name = 'Angular Fundamentals' AND level = 'Beginner' LIMIT 1)),
  ('Angular Fundamentals - Evening', '2026-07-03 18:30:00', 90, 39.50, (SELECT id FROM courses WHERE name = 'Angular Fundamentals' AND level = 'Beginner' LIMIT 1)),
  ('Node API Design - Weekend', '2026-07-05 10:00:00', 180, 79.00, (SELECT id FROM courses WHERE name = 'Node API Design' AND level = 'Intermediate' LIMIT 1)),
  ('Architecture Patterns - Intensive', '2026-07-08 14:00:00', 240, 129.99, (SELECT id FROM courses WHERE name = 'Architecture Patterns' AND level = 'Advanced' LIMIT 1))
ON DUPLICATE KEY UPDATE
  duration = VALUES(duration),
  price = VALUES(price),
  course_id = VALUES(course_id);