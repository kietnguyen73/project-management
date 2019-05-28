const 
const db = require('../models/associations/model-associations');
const Employee = db.Employee;

class EmployeeManager {
    
    insertEmployee(employee) {
        Employee.create(employee);
    }
}

module.exports = EmployeeManager;