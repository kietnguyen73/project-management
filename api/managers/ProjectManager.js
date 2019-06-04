const db = require('../models/associations/model-associations');
const Project = db.Project;

class ProjectManager {
    
    insertProject(project) {
        return Project.create(project);
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
            attributes: {
                exclude: ["password"]
            }
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
                user_name: username
            }
        });
    }
}

module.exports = ProjectManager;