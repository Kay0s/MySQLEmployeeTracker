const connection = require("./connection.js");

class DB {
  constructor(connection, firstName, lastName, roleID, managerID) {
    this.connection = connection;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleID = roleID;
    this.managerID = managerID;
  }

  saveToDatabase() {}

  getAllEmployees() {
    return this.connection.query, this.connection, this.firstName, this.lastName, this.roleID, this.managerID;
  }
}

module.exports = DB;

//selecy * from employees
//dept is a number

//join and then choose the columns that you want to choose from
//employees.role.ed = role.id

//filtering
