DROP DATABASE IF EXISTS employeetracker_db;

CREATE DATABASE employeetracker_db;

USE employeetracker_db;


CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
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



CREATE TABLE employe_info(
  employee_id int,
   first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  titel varchar(30) NOT NULL,
  department_name varchar(30) NOT NULL,
  salary decimal NOT NULL,
  manager varchar(30,
  foreign key (employe_id) REFERENCES employee (id) ON DELETE CASCADE});

  SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name,
  role.salary, employee.manager_id
  FROM employee
  INNER JOIN employee_info ON employee_info.employee_id = employee.depart_id
  INNER JOIN employee_info ON employee_info.first_name = employee.first_name
  INNER JOIN employee_info ON employee_info.last_name = employee.last_name;
    INNER JOIN employee_info ON employee_info.manager = employee.manager_id;

    SELECT role.title, role.salary

  FROM role
  INNER JOIN employee_info ei_alias1 ON employee_info.title=role.title
  INNER JOIN employee_info ON employee_info.salary= role.salary;


    SELECT department.name
  FROM department
  INNER JOIN employee_info ON employee_info.department_name = role.department;



  SELECT employee.id, first_name, last_name, title, salary, manager
