const db = require('../models/associations/model-associations');
const Role = db.Role;

class RoleManager {
    
    insertRole(role) {
        return Role.create(role);
    }

    getPermissionByRoleId(roleId) {

        return Role.findAll({
            where: {
                role_id: roleId,
            },
            include: [{
                model : db.Permission,
                through: {
                    attributes: []
                }
            }],
        });
    }



}

module.exports = RoleManager;