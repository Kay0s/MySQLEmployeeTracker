const { connection } = require("./db/connection");
const inquirer = require("inquirer");
// const ctable = require("console.table");
const mysql = require("mysql");
// const ascii = require("ascii-logo");

function runEmployeeView() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "Add Department",
        "Quit",
      ],
    })
    .then((res) => {
      let choice = res.action;
      switch (choice) {
        case "View All Employees":
          employeeView();
          break;
        case "View All Departments":
          departmentView();
          break;
        case "View All Roles":
          roleView();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Quit":
          connection.end();
          break;
      }
    });
  // function which prompts the user for what action they should take
  function employeeView() {
    let query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
      if (err) throw err;
      {
        console.table(res);
      }
      runEmployeeView();
    });
  }

  function departmentView() {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
      if (err) throw err;
      {
        console.table(res);
      }
      runEmployeeView();
    });
  }

  function roleView() {
    let query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
      if (err) throw err;
      {
        console.table(res);
      }
      runEmployeeView();
    });
  }

  function addDepartment() {
    inquirer
      .prompt([
        {
          name: "departmentName",
          type: "input",
          message: "What is the department name?",
        },
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: answer.departmentName,
          },
          function (err) {
            if (err) {
              throw err;
            } else {
              let query = "SELECT * FROM department";
              connection.query(query, function (err, res) {
                if (err) throw err;
                {
                  console.table(res);
                }
                runEmployeeView();
              });
            }
          }
        );
      });
  }

  function addRole() {
    inquirer
      .prompt([
        {
          name: "roleTitle",
          type: "input",
          message: "What is the role title",
        },

        {
          name: "roleSalary",
          type: "input",
          message: "What is the role's salary",
        },
        {
          name: "departmentId",
          type: "input",
          message: "What is the employee's manager's id?",
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.roleTitle,
            salary: answer.roleSalary,
            department_id: answer.departmentId,
          },
          function (err) {
            if (err) {
              throw err;
            } else {
              let query = "SELECT * FROM role";
              connection.query(query, function (err, res) {
                if (err) throw err;
                {
                  console.table(res);
                }
                runEmployeeView();
              });
            }
          }
        );
      });
  }

  function addEmployee() {
    inquirer
      .prompt([
        {
          name: "employeeFirst",
          type: "input",
          message: "What is your employee's first name?",
        },

        {
          name: "employeeLast",
          type: "input",
          message: "What is your employee's last name?",
        },
        {
          name: "managerId",
          type: "input",
          message: "What is the employee's manager's id?",
        },

        {
          name: "employeeRoleId",
          type: "input",
          message: "What is the employee's role id?",
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.employeeFirst,
            last_name: answer.employeeLast,
            manager_id: answer.managerId,
            role_id: answer.employeeRoleId,
          },
          function (err) {
            if (err) {
              throw err;
            } else {
              let query = "SELECT * FROM employee";
              connection.query(query, function (err, res) {
                if (err) throw err;
                {
                  console.table(res);
                }
                runEmployeeView();
              });
            }
          }
        );
      });
  }

  function updateEmployeeRole() {
    connection.query(
      `SELECT r.id AS 'Role Id', title AS Title, CONCAT(first_name," ",last_name) AS Name, e.id AS 'Id #'
      FROM role r
      LEFT JOIN employee e
      ON e.role_id = r.id;`,
      (err, res) => {
        if (err) throw err;
        console.table(res);
      }
    );
    setTimeout(() => {
      inquirer
        .prompt([
          {
            name: "employeeID",
            type: "input",
            message: "What is the employee's id?",
          },

          {
            name: "updateEmployeeRole",
            type: "input",
            message: "What is the employee's new role id?",
          },
        ])
        .then((answer) => {
          connection.query(
            `UPDATE employee SET role_id  = ${answer.updateEmployeeRole}
           WHERE id = ${answer.employeeID};`,
            (err) => {
              if (err) {
                throw err;
              } else {
                connection.query(
                  `SELECT r.id AS 'Role Id', title AS Title, CONCAT(first_name," ",last_name) AS Name, e.id AS 'Id #'
                  FROM role r
                  LEFT JOIN employee e
                  ON e.role_id = r.id;`,
                  (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    runEmployeeView();
                  }
                );
              }
            }
          );
        });
    }, 1000);
  }
}

runEmployeeView();
