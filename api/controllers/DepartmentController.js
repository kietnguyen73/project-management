const DepartmentManager = require('../managers/DepartmentManager');
const departmentManager = new DepartmentManager();
const hasPermission = require('../policies/hasPermission');

class DepartmentController {

    async findDepartmentById(req, res, next) {

        try {

            let status =  await hasPermission(req, res, next);
            console.log("status" +status);
            if (status) {

                let departmentId = req.params.id;
                let department = await departmentManager.getDepartmentById(departmentId);

                if (department.length === 0) {
                    return res.status(200).json({ message: "Cannot find department" });
                }
                return res.status(200).json({ department });
                
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
                departmentManager.getAllDepartment()
                    .then(department => {
                        console.log("back here");
                        return res.status(200).json({ department });
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

    async createDepartment(req, res, next) {

        try {
            let status = await hasPermission(req, res, next);
            if(status) {
                let isExisted = await departmentManager.isExisted(req.body);
                if(isExisted.length) 
                    return res.status(400).json({message : isExisted});
                    
                departmentManager.insertDepartment(req.body)
                .then(result => {
                    return res.status(200).json({ message: "Inserted department successfully" });
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


    async deleteDepartment(req, res, next) {

        try {
            
            let status = await hasPermission(req, res, next);
            if(status) {
                let departmentId = req.params.id;

                departmentManager.removeDepartment(departmentId)
                    .then(result => {
                        if (result[0] === 1) {
                            return res.status(200).json({ message: "Deleted department successfully" });
                        }
                        return res.status(500).json({ message: "Deleted department failed" });
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


    async updateDepartment(req, res, next) {
        
        try {
            
            let status = await hasPermission(req, res, next);
            if(status) {
                let departmentId = req.params.id;
                let department = await departmentManager.getDepartmentById(departmentId);

                if (department.length === 0) {
                    return res.status(200).json({ message: "Cannot find department" });
                }
                if (req.body.departmentId) {
                    if (req.body.departmentId != departmentId) {
                        return res.status(200).json({ message: "Department ID must the same" });
                    }
                }
                departmentManager.updateDepartmentById(departmentId, req.body)
                    .then(result => {
                        console.log(result[0]);
                        if (result[0] === 1) {
                            return res.status(200).json({ message: "Updated department successfully" });
                        }
                        return res.status(500).json({ message: "Updated department failed" });

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

module.exports = DepartmentController;