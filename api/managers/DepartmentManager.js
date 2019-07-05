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
            },
            attributes: {
                exclude: ['isDeleted', 'createdBy'],
            },
            include: [
                { model: db.Project },
                { model: db.Employee, 
                    as: 'employees',
                    attributes: {
                        exclude: ["password", "isDeleted", "roleId", "departmentId", "createdBy"]
                    }
                },
                { model: db.Employee, as: 'CreatedBy', attributes: ['employeeId', 'username'] }
            ],
        });
    }

    getDepartmentById(departmentId) {
        return Department.findAll({
            where: {
                departmentId: departmentId
            },
            include: [
                { model: db.Project },
                { model: db.Employee, 
                    as: 'employees',
                    attributes: {
                         exclude: ["password", "isDeleted", "roleId", "departmentId", "createdBy"]
                    }
                },
                { model: db.Employee, as: 'CreatedBy', attributes: ['employeeId', 'username'] }
            ]
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

    getDepartmentByDepartmentCode(departmentCode) {
        return Department.findAll({
            where: {
                departmentCode: departmentCode
            }
        });
    }

    getDepartmentByDepartmentName(departmentName) {
        return Department.findAll({
            where: {
                departmentName: departmentName
            }
        });
    }

    async isExisted(department) {
        let message = [];
        if(department.departmentCode) {
            let departmentCode = await this.getDepartmentByDepartmentCode(department.departmentCode);
            if(departmentCode && departmentCode.length > 0) 
                message.push("DepartmentCode already exists");
        }
        if(department.departmentName) {
            let departmentName = await this.getDepartmentByDepartmentName(department.departmentName);
            if(departmentName && departmentName.length > 0) 
                message.push("DepartmentName already exists");
        }
        return message;
    }

}

module.exports = DepartmentManager;