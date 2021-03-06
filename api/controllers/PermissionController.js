const Manager = require('../managers/PermissionManager');
const manager = new Manager();
const RolePermissionManager = require('../managers/RolePermissionManager');
const rolePermissionManager = new RolePermissionManager();
const RoleManager = require('../managers/RoleManager');
const roleManager = new RoleManager();
const permissionData = require('../seed-data/Permission.json');
const rolePermissionData = require('../seed-data/RolePermission.json');
const roleData = require('../seed-data/Role.json');
const DepartmentManager = require('../managers/DepartmentManager');
const departmentManager = new DepartmentManager();
const DeliveryCenterManager = require('../managers/DeliveryCenterManager');
const deliveryCenterManager = new DeliveryCenterManager();
const ProjectManager = require('../managers/ProjectManager');
const projectManager = new ProjectManager();
const EmployeeManager = require('../managers/EmployeeManager');
const employeeManager = new EmployeeManager();
const departmentData = require('../seed-data/Department.json');
const projectData = require('../seed-data/Project.json');
const employeeData = require('../seed-data/Employee.json');


class PermissionController {

    /* insert seed-data into db*/

    

    async importPermission() {
        for(let permission of permissionData) {
            await manager.insertEmployee(permission);
        }
    }

    importRolePermission() {
        for(let rolePermission of rolePermissionData) {
            rolePermissionManager.insertRolePermission(rolePermission);
        }
    }
    
    importRole() {
        for(let role of roleData) {
            roleManager.insertRole(role);
        }
    }

    importDepartment() {
        for(let department of departmentData) {
            departmentManager.insertDepartment(department);
        } 
    }

    importProject() {
        for(let project of projectData) {
            projectManager.insertProject(project);
        } 
    }

    importEmployee() {
        for(let employee of employeeData) {
            employeeManager.insertEmployee(employee);
        } 
    }

    importSeedData(req, res, next) {
        try {
             this.importPermission().then(data => {

             }).catch(err => console.log(err.message));
        } catch(err) {
            console.log(err.message);
        }
      
        // await this.importRole();
        // await this.importRolePermission();
        // await this.importDepartment();
        // await this.importProject();
        // await this.importEmployee();
    }




}

module.exports = PermissionController;