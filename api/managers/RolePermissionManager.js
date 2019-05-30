const db = require('../models/associations/model-associations');
const RolePermission = db.RolePermission;

class RolePermissionManager {
    
    insertRolePermission(rolePermission) {
        return RolePermission.create(rolePermission);
    }


}

module.exports = RolePermissionManager;