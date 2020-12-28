const { connection } = require("./db/connection");
const inquirer = require("inquirer");
const ctable = require("console.table");
const mysql = require("mysql");
const ascii = require("ascii-logo");

function runEmployeeView() {
  inquirer
    .promp({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
      {
        name:"View all employees", 
        value: "VIEW_EMPLOYEES"
      },
      {
        name:"View All Employees By Department",
        value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
      },
      {
        name:"View All Employees by Manager",
        value: "VIEW_EMPLOYEES_BY_MANAGER"
      },
      {
        name: "Add Employee",
        value: "ADD_EMPLOYEE"
      },
      {
        name: "Update Employee Role",
        value: "UPDATE_EMPLOYEE_ROLE"
      },
      {
        name: "Remove Employee",
        value: "REMOVE_EMPLOYEE"
      },
      {
        name: "Update Employee Role",
        value: "UPDATE_EMPLOYEE_ROLE"
      },
      {
        name: "Update Employee Manager",
        value: "UPDATE_EMPLOYEE_MANAGER"
      },
      {
        name: "View All Role",
        value: "VIEW_ROLES"
      },
      {
        name: "Add Role",
        value: "ADD_ROLE"
      },
      {
        name: "Remove Role",
        value: "REMOVE_ROLE"
      },
      {
        name: "View All Departments",
        value: "VIEW_DEPARTMENTS"
      },
      {
        hame: "Quit",
        value: "QUIT"
      }
    ]
  }

    .then(function (answer) {
      switch (answer.action) {
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
      for (var i = 0; i, res.length; i++) {
        console.table([res[i]]);
      }
      runEmployeeView();
    });
    function departmentSearch() {
      let query = "SELECT * FROM department";
      connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i, res.lenght; i++) {
          console.table([res[i]]);
        }
        runEmployeeView();
      });
      function departmentRole() {
        let query = "SELECT * FROM role";
        connection.query(query, function (err, res) {
          if (err) throw err;
          for (var i = 0; i, res.lenght; i++) {
            console.table([res[i]]);
          }
          runEmployeeView();
        });

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
    }
  }
}
