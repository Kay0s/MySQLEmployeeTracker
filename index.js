const { connection } = require("./db/connection");
const inquirer = require("inquirer");
const ctable = require("console.table");
const logo = require("asciiart-logo");

function runEmployeeView() {
  console.log(
    logo({
      name: "Employee Tracker",
      font: "Standard",
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: "grey",
      logoColor: "bold-green",
      textColor: "green",
    })
      .emptyLine()
      .right(
        "Employee Tracking Application to view and interact with information stored in a database using node, inquirer, and MySQL."
      )
      .emptyLine()
      .render()
  );
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
    setTimeout(() => {
      let query = "SELECT * FROM employee";
      connection.query(query, function (err, res) {
        if (err) throw err;
        {
          console.table(res);
        }
        runEmployeeView();
      });
    }, 1000);
  }

  function departmentView() {
    setTimeout(() => {
      let query = "SELECT * FROM department";
      connection.query(query, function (err, res) {
        if (err) throw err;
        {
          console.table(res);
        }
        runEmployeeView();
      });
    }, 1000);
  }

  function roleView() {
    setTimeout(() => {
      let query = "SELECT * FROM role";
      connection.query(query, function (err, res) {
        if (err) throw err;
        {
          console.table(res);
        }
        runEmployeeView();
      });
    }, 1000);
  }

  function addDepartment() {
    connection.query(`SELECT * FROM department`, (err, res) => {
      if (err) throw err;
      console.table(res);
    });
    setTimeout(() => {
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
                });
              }
            }
          );
        });
    }, 1000);
  }

  function addRole() {
    connection.query(`SELECT * FROM role`, (err, res) => {
      if (err) throw err;
      console.table(res);
    });
    setTimeout(() => {
      inquirer;
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
            message: "What is the role's department id?",
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
                let query = `SELECT * FROM role`;
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
    }, 1000);
  }

  function addEmployee() {
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
            name: "employeeRoleId",
            type: "input",
            message: "What is the employee's role id?",
          },
          {
            name: "managerId",
            type: "input",
            message: "What is the employee's manager's id?",
          },
        ])
        .then(function (answer) {
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.employeeFirst,
              last_name: answer.employeeLast,
              role_id: answer.employeeRoleId,
              manager_id: answer.managerId,
            },
            function (err) {
              if (err) {
                throw err;
              } else {
                let query = `SELECT r.id AS 'Role Id', title AS Title, CONCAT(first_name," ",last_name) AS Name, e.id AS 'Id #'
                FROM role r
                LEFT JOIN employee e
                ON e.role_id = r.id;`;
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
    }, 1000);
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
