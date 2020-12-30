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
        "View All Employees by Department",
        "View All Employees by Manager",
        "Add Employee",
        "Update Employee Role",
        "Remove Employee",
        "Update Employee Manager",
        "View All Roles",
        "Add Role",
        "Remove Role",
        "View All Departments",
        "Quit",
      ],
    })
    .then((res) => {
      let choice = res.action;
      switch (choice) {
        case "View All Employees":
          employeeView();
          break;
        case "View All Employees by Department":
          employeeByDeptView();
          break;
        case "View All Employees by Manager":
          employeeByManagerView();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "View All Departments":
          departmentView();
          break;
        case "View All Roles":
          roleView();
          break;
        case "Add Department":
          departmentRole();
          break;
        case "Add Role":
          add();
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

  function addEmployee() {
    inquirer
      .prompt([
        {
          name: "employeeFirst",
          type: "input",
          message: "What is your employee's first name?",
        },

        {
          name: "employeeSecond",
          type: "input",
          message: "What is your employee's last name?",
        },

        {
          name: "employeRole",
          type: "list",
          message: "What is the employee's role id?",
        },
      ])

      .then(function (answer) {
        console.log(answer);
        connection.query(
          "INSERT INTO employee SET ?",
          {
            employeeFirst: answer.employeeFirst,
            employeeLast: answer.employeeLast,
          },
          connection.query(
            "INSERT INTO employee_role SET ?",
            {
              employeeRole: answer.employeeRole,
            },

            function (err, res) {
              if (err) throw err;
              console.log(err);
            }
          )
        );
        console.table(res);
        runEmployeeView();
      });
  }
}
runEmployeeView();
