DROP DATABASE IF EXISTS employeetracker_db;

CREATE DATABASE employeetracker_db;

USE employeetracker_db;


CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE CASCADE
);


CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary decimal NOT NULL,
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);


SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;
