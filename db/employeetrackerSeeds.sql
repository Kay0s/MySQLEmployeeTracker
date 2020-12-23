DROP DATABASE IF EXISTS employeetrackerDB;

CREATE DATABASE employeetrackerDB;

USE employeetrackerDB;


CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
 first_name varchar(30) NOT NULL,
 last_name varchar(30) NOT NULL,
  dpt_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department (
   dpt_id INT NOT NULL AUTO_INCREMENT,
   dpt_name varchar(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  dpt_id INT NOT NULL,
  PRIMARY KEY (id)
);



insert INTO employee (first_name, last_name, role_id)
values('John', 'Johnson', 1);
insert INTO employee(first_name, last_name, role_id)
values('Peter', 'Peterson', 2);
insert INTO employee(first_name, last_name, role_id)
values('Sue', 'Sueson', 3)
insert INTO employee(first_name, last_name, role_id)
values('Robert', 'Robertson', 4);
insert INTO employee(first_name, last_name, role_id)
values('Marge', 'Margeson', 5);





insert INTO department(dpt_name)
values('Sales');
insert INTO department(dpt_name)
values('Engineering');
insert INTO department(dpt_name)
values('Finance');
insert INTO department(dpt_name)
values('Legal');
insert INTO department(dpt_name)
values('Manager');



insert INTO role (title, salary, dpt_id)
values('Sales Manager', 100000, 1);
insert INTO role(title, salary, dpt_id)
values('Salesperson',  40000, 1);
insert INTO role(title, salary, dpt_id)
values('Lead Engineer' 45000, 2);
insert INTO role(title, salary, dpt_id)
values('Accountant' 45000, 3);
insert INTO role(title, salary, dpt_id)
values('Legal' 60000, 3);
insert INTO role(title, salary, dpt_id)
values('Manager' 61000, 3);



