const Manager = require('../managers/PermissionManager');
const manager = new Manager();
const RolePermissionManager = require('../managers/RolePermissionManager');
const rolePermissionManager = new RolePermissionManager();
const RoleManager = require('../managers/RoleManager');
const roleManager = new RoleManager();
const DepartmentManager = require('../managers/DepartmentManager');
const departmentManager = new DepartmentManager();
const ProjectManager = require('../managers/ProjectManager');
const projectManager = new ProjectManager();
const EmployeeController = require('../controllers/EmployeeController');
const employeeController = new EmployeeController();
const TaskManager = require('../managers/TaskManager');
const taskManager = new TaskManager();
const SprintManager =  require('../managers/SprintManager');
const sprintManager = new SprintManager();
const EmployeeProjectManager =  require('../managers/Employee_Project_Manager');
const employeeProjectManager = new EmployeeProjectManager();
const permissionData = require('../seed-data/Permission.json');
const departmentData = require('../seed-data/Department.json');
const projectData = require('../seed-data/Project.json');
const employeeData = require('../seed-data/Employee.json');
const rolePermissionData = require('../seed-data/RolePermission.json');
const roleData = require('../seed-data/Role.json');
const sprintData = require('../seed-data/Sprint.json');
const taskData = require('../seed-data/Task.json');
const employeeProjectData = require('../seed-data/EmployeeProject.json');



module.exports.importPermission = async () => {
    for(let permission of permissionData) {
        await manager.insertEmployee(permission);
    }
}

module.exports.importRolePermission = async () => {
    for(let rolePermission of rolePermissionData) {
        await rolePermissionManager.insertRolePermission(rolePermission);
    }
}

module.exports.importRole = async () => {
    for(let role of roleData) {
        await roleManager.insertRole(role);
    }
}

module.exports.importDepartment = async () => {
    for(let department of departmentData) {
        await departmentManager.insertDepartment(department);
    } 
}

module.exports.importProject = async () => {
    for(let project of projectData) {
        await projectManager.insertProject(project);
    } 
}

module.exports.importEmployee = async () => {
    for(let employee of employeeData) {
        await employeeController.createEmployee2(employee);
    } 
}

module.exports.importSprint = async () => {
    for(let sprint of sprintData) {
        
        await sprintManager.insertSprint(sprint);
    } 
}

module.exports.importTask = async () => {
    for(let task of taskData) {
        await taskManager.insertTask(task);
    } 
}

module.exports.importEmployeeProject = async () => {
    for(let employeeProject of employeeProjectData) {
        await employeeProjectManager.insertEmployeeProject(employeeProject);
    } 
}

module.exports.importSeedData = async (req, res, next) => {
    try {
        await this.importPermission();
        await this.importRole();
        await this.importRolePermission();
        await this.importDepartment();
        await this.importProject();
        await this.importEmployee();
        await this.importSprint();
        await this.importTask();
        await this.importEmployeeProject();
    } catch(err) {
        console.log(err.message);
    }
  
  
}