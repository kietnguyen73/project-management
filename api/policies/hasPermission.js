const permissions = require('../../config/permissions');
const Role = require('../managers/RoleManager');
const role = new Role();

module.exports = async function hasPermission(req, res, next) {

    let segments = req.baseUrl.split('/');
    let route = segments[segments.length - 1];
    let action = req.route['stack'][0]['name'];

    // let action = "createEmployee";
    let permissionCode = permissions[route][action];
    console.log(permissionCode);
    console.log(req.user.role);
    
    //get permissions list with specific role
    if (req.user.role) {

        let rolePermissions = await role.getPermissionByRoleId(req.user.role);
        let employeePermissions = rolePermissions[0].permissions;

        //check whether user has permission to access resource or not 
        let isExist = employeePermissions.find(element => {
            return element.permissionCode === permissionCode;
        });       

        if (!isExist) {
            console.log("vao day ko " +isExist);
            return res.status(403).json({ message: "Have not permission to access this resource" });
        }

    } else {
        return res.status(403).json({ message: "Have not permission to access this resource" });
    }

    

}