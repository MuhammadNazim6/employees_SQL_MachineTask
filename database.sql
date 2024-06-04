CREATE DATABASE employee_management;

  CREATE TABLE roles(
    id BIGSERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
  );

CREATE TABLE employees(
  id BIGSERIAL PRIMARY KEY,
  role_id BIGINT REFERENCES roles(id),
  name VARCHAR(100) NOT NULL,
  empcode INT NOT NULL,
  mail_id VARCHAR(100) NOT NULL UNIQUE,
  phone_number VARCHAR(20) NOT NULL
);