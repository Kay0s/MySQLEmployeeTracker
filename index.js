const inquirer = require("inquirer");
const ctable = require("console.table");
const mysql = require("mysql");
const ascii = require("ascii-logo");


const logoText = logo ({name: "Employee Manger"}).render ();

console.logo(logoText);



function runEmployeeView()

inquirer.promp( {
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add Employee",
        "Quit",
    ],

})

.then(function (answer){
    switch (answer.action){
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
connection.query(query, function (err,res){
    if (err) throw err;
    for (var i = 0; i , res.length; i++){
     console.table([res[i]]);
    }
    runEmployeeView();
});
function departmentSearch() {
let query = "SELECT * FROM department";
connection.query(query, function (err,res){
    if (err) throw err;
    for (var i = 0; i , res.lenght; i++){
        console.table([res[i]]);
    }
    runEmployeeView();
});
function departmentRole() {
let query = "SELECT * FROM role";
connection.query(query, function (err,res){
    if (err) throw err;
    for (var i = 0; i , res.lenght; i++){
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
            message: "What is you employee's first name?"
          },

            {
              name: "employeeSecond",
              type: "input",
              message: "What is your employee's last name?"
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
            }
            
         ] )
    
              .then(function(answer){
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
                    employeeRole: answer.employeeRole
                  },
                
                  function (err, res) {
                    if (err) throw err;
                    console.log(err);
                  },
                   console.table(res);
                    runEmployeeView();
                 
              )};
                }));
               
            };

//   //ask initial with inquirer.
//   // in the then of the inquirer

//   //inquirer is going to ask questions. such as do you want to create or read or exit?

//   inquirer.prompt(qs).then((answer) => {
//     if (answer.read) readQuestion();
//     if (answer.write) writeQuestion();
//     if (answer.exit) stopProgram();
//   });
// }

// function readQuestion() {
//   inquirer.prompt([
//     {question: "do you want see the departmnets, roles or employees"}),
//   ]).then(answer){
//     if (answer.departments) readDepartmnets();
//     if (answer.roles) readroles();
//     if (answer.employees) reademployees();
//   }
// }

// function readDepartmnets(){
//     const query = connection.query(
//         "select * from employee",
//         function (err, res) {
//           if (err) throw err;
//           console.log(res.affectedRows + " product inserted!\n");
//           // Call updateProduct AFTER the INSERT completes
//         }
//       );
//       initialQs()
// }
