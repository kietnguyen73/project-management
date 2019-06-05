const db = require('../models/associations/model-associations');
const Role = db.Role;

class RoleManager {
    
    insertRole(role) {
        return Role.create(role);
    }

    getAllRole() {
        return Role.findAll({
            include: [{ 
                model: db.Permission,
                through: {
                    attributes: []
                }
            }]
        })
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

    updateRoleById(roleId, role) {
        return role.update(
           role
        , {
            where: {
                roleId: roleId
            }
        });
    }



}

module.exports = RoleManager;