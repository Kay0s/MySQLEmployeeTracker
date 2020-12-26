
USE employeetrackerDB;


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



