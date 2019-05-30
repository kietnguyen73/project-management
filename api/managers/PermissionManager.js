const db = require('../models/associations/model-associations');
const Permission = db.Permission;

class PermissionManager {
    
    insertEmployee(permission) {
        return Permission.create(permission);
    }


}

module.exports = PermissionManager;