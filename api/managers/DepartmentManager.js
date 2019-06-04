const db = require('../models/associations/model-associations');
const Department = db.Department;

class DepartmentManager {
    
    insertDepartment(department) {
        return Department.create(department);
    }

    removeDepartment(departmentId) {
        return Department.update({
            isDeleted: 1
        }, {
            where: {
                departmentId: departmentId
            }
        });
    }

    getAllDepartment() {
        return Department.findAll({
            where: {
                isDeleted: 0
            }
        });
    }

    getDepartmentById(departmentId) {
        return Department.findAll({
            where: {
                departmentId: departmentId
            }
        });
    }

    updateDepartmentById(departmentId, department) {
        return Department.update(
            department
        , {
            where: {
                departmentId: departmentId
            }
        });
    }

}

module.exports = DepartmentManager;