const db = require('../models/associations/model-associations');
const Employee = db.Employee;

class EmployeeManager {
    
    insertEmployee(employee) {
        return Employee.create(employee);
    }

    removeEmployee(employeeId) {
        return Employee.update({
            isDeleted: 1
        }, {
            where: {
                employeeId: employeeId
            }
        });
    }
}

module.exports = EmployeeManager;