const db = require('../models/associations/model-associations');
const EmployeeProject = db.EmployeeProject;

class EmployeeProjectManager {
    
    insertEmployeeProject(employeeProject) {
        return EmployeeProject.create(employeeProject);
    }

    removeEmployeeProject(employeeProjectId) {
        return EmployeeProject.update({
            isDeleted: 1
        }, {
            where: {
                employeeProjectId: employeeProjectId
            }
        });
    }

    getAllEmployeeProject() {
        return EmployeeProject.findAll({
            where: {
                isDeleted: 0,
            },
            include: [{ model: db.Department }]
        });
    }

    getEmployeeProjectById(employeeProjectId) {
        return EmployeeProject.findAll({
            where: {
                employeeProjectId: employeeProjectId
            }
        });
    }

    updateEmployeeProjectById(employeeProjectId, employeeProject) {
        return EmployeeProject.update(
           employeeProject
        , {
            where: {
                employeeProjectId: employeeProjectId
            }
        });
    }

}

module.exports = EmployeeProjectManager;