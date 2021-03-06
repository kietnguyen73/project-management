const RoleManager = require('../managers/RoleManager');
const roleManager = new RoleManager();
const hasPermission = require('../policies/hasPermission');

class RoleController {

    async findRoleById(req, res, next) {

        try {

            let status =  await hasPermission(req, res, next);
            console.log("status" +status);
            if (status) {

                let roleId = req.params.id;
                let role = await roleManager.getRoleById(roleId);

                if (role.length === 0) {
                    return res.status(200).json({ message: "Cannot find role" });
                }
                return res.status(200).json({ role });
            } else {
                return res.status(403).json({ message: "Have not permission to access this resource" });
            }

        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    async findAll(req, res, next) {

        try {
            let status = await hasPermission(req, res, next);
            console.log("status" +status);
            if (status) {
                roleManager.getAllRole()
                    .then(role => {
                        console.log("back here");
                        return res.status(200).json({ role });
                    })
                    .catch(err => {
                        return res.status(500).json({ message: err });
                    });
            } else {
                return res.status(403).json({ message: "Have not permission to access this resource" });
            }

        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    async createRole(req, res, next) {

        try {

            let status = await hasPermission(req, res, next);

            if(status) {
                roleManager.insertRole(req.body)
                .then(result => {
                    return res.status(200).json({ message: "Inserted role successfully" });
                })
                .catch(err => {
                    return res.status(500).json({ message: err });
                });
            } else {
                return res.status(403).json({ message: "Have not permission to access this resource" });
            }
        } catch(err) {
            return res.status(500).json({ message: err });
        }
        
    }


    async deleteRole(req, res, next) {

        try {
            
            let status = await hasPermission(req, res, next);
            if(status) {
                let roleId = req.params.id;

                roleManager.removeRole(roleId)
                    .then(result => {
                        if (result[0] === 1) {
                            return res.status(200).json({ message: "Deleted role successfully" });
                        }
                        return res.status(500).json({ message: "Deleted role failed" });
                    })
                    .catch(err => {
                        return res.status(500).json({ message: err });
                    });
            } else {
                return res.status(403).json({ message: "Have not permission to access this resource" });
            }
            
        } catch(err) {
            return res.status(500).json({ message: err });
        }
        
    }


    async updateRole(req, res, next) {
        
        try {
            
            let status = await hasPermission(req, res, next);
            if(status) {
                let roleId = req.params.id;
                let role = await roleManager.getRoleById(roleId);

                if (role.length === 0) {
                    return res.status(200).json({ message: "Cannot find role" });
                }
                if (req.body.roleId) {
                    if (req.body.roleId != roleId) {
                        return res.status(200).json({ message: "Role ID must the same" });
                    }
                }
                roleManager.updateRoleById(roleId, req.body)
                    .then(result => {
                        console.log(result[0]);
                        if (result[0] === 1) {
                            return res.status(200).json({ message: "Updated role successfully" });
                        }
                        return res.status(500).json({ message: "Updated role failed" });

                    })
                    .catch(err => {
                        return res.status(500).json({ message: err });
                    });
            } else {
                return res.status(403).json({ message: "Have not permission to access this resource" });
            }

        } catch (err) {
            return res.status(500).json({ message: err });
        }

    }


}

module.exports = RoleController;