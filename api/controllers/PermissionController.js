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
const deliveryCenterData = require('../seed-data/DeliveryCenter.json');
const projectData = require('../seed-data/Project.json');
const employeeData = require('../seed-data/Employee.json');


class PermissionController {

    /* insert seed-data into db*/

    importPermission() {
        for(let permission of permissionData) {
            manager.insertEmployee(permission);
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

    importDeliveryCenter() {
        for(let deliveryCenter of deliveryCenterData) {
            deliveryCenterManager.insertDeliveryCenter(deliveryCenter);
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




}

module.exports = PermissionController;