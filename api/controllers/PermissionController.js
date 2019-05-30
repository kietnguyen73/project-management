const Manager = require('../managers/PermissionManager');
const manager = new Manager();
const RolePermissionManager = require('../managers/RolePermissionManager');
const rolePermissionManager = new RolePermissionManager();
const RoleManager = require('../managers/RoleManager');
const roleManager = new RoleManager();
const permissionData = require('../seed-data/Permission.json');
const rolePermissionData = require('../seed-data/RolePermission.json');
const roleData = require('../seed-data/Role.json');

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


}

module.exports = PermissionController;