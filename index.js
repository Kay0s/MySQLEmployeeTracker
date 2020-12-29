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
        "View all employees",
        "View All Employees By Department",

        "View All Employees by Manager",

        "Add Employee",

        "Update Employee Role",

        "Remove Employee",

        "Update Employee Role",

        "Update Employee Manager",

        "View All Role",

        "Add Role",

        "Remove Role",

        "View All Departments",

        "Quit",
      ],
    })
    .then((res) => {
      let choice = res.action;
      switch (choice) {
        case "View all employees":
          employeeSearch();
          break;
        case "View all departments":
          departmentSearch();
          break;
        case "View all roles":
          roleSearch();
          break;
        case "Add Employee":
          addEmployee();
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
        default:
          console.log("Your choice does not match any options");
          runEmployeeView();
          break;
      }
    });
  // function which prompts the user for what action they should take
  function employeeSearch() {
    let query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
      if (err) throw err;
      for (let i = 0; i, res.length; i++) {
        console.table(res);
      }
      runEmployeeView();
    });
  }
  function departmentSearch() {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
      if (err) throw err;
      for (let i = 0; i, res.lenght; i++) {
        console.table(res);
      }
      runEmployeeView();
    });
  }
  function departmentRole() {
    let query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
      if (err) throw err;
      for (let i = 0; i, res.lenght; i++) {
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
          message: "What is you employee's first name?",
        },

        {
          name: "employeeSecond",
          type: "input",
          message: "What is your employee's last name?",
        },

        {
          name: "employeRole",
          type: "list",
          message: "What is the employee's role?",
          choices: [
            "Salesperson",
            "Lead Engineer",
            "Software Engineer",
            "Account Manager",
            "Accountant",
            "legal Team Lead",
            "Lawyer",
            "Intern",
          ],
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
