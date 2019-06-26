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

    getAllEmployee() {
        return Employee.findAll({
            where: {
                isDeleted: 0
            },
            attributes: {
                exclude: ["password", "isDeleted", "roleId", "departmentId", "createdBy"]
            },
            include: [
                { model: db.Employee, attributes: ['employeeId','username'], as: 'CreatedBy'},
                { model: db.Department, attributes: ['departmentId', 'departmentCode', 'departmentName']},
                {model: db.Role, attributes: ['roleId', 'roleName']}
            ]
        });
    }

    getEmployeeById(employeeId) {
        return Employee.findAll({
            where: {
                employeeId: employeeId
            }
        });
    }

    updateEmployeeById(employeeId, employee) {
        return Employee.update(
           employee
        , {
            where: {
                employeeId: employeeId
            }
        });
    }

    findUser(username, password) {

        return Employee.findAll({
            where: {
                user_name: username,
                password: password
            }
        });
    }

    findUserByUserName(username) {
        return Employee.findAll({
            where: {
                user_name: username,
                isDeleted: 0
            }
        });
    }

    findUserByEmail(email) {
        return Employee.findAll({
            where: {
                email: email,
                isDeleted: 0
            }
        });
    }


}

module.exports = EmployeeManager;