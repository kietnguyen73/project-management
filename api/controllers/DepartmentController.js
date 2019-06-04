const DepartmentManager = require('../managers/DepartmentManager');
const departmentManager = new DepartmentManager();
const hasPermission = require('../policies/hasPermission');

class DepartmentController {

    async findDepartmentById(req, res, next) {
        
        hasPermission(req, res, next);
    
        let departmentId = req.params.id;

        try {
            let department = await departmentManager.getDepartmentById(departmentId);
            if (department.length === 0) {
                return res.status(200).json({ message: "Cannot find department" });
            }
            return res.status(200).json({ department });
    
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    findAll(req, res, next) {

        hasPermission(req, res, next);

        departmentManager.getAllDepartment()
            .then(department => {
                return res.status(200).json({ department });
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            });
    }

    createDepartment(req, res, next) {
       
        hasPermission(req, res, next);

        departmentManager.insertDepartment(req.body)
        .then(result => {
            return res.status(200).json({ message: "Inserted department successfully" });
        })
        .catch(err => {
            return res.status(500).json({ message: err });
        });
    }


    deleteDepartment(req, res, next) {
        
        hasPermission(req, res, next);

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
    }

    
    async updateDepartment(req, res, next) {

        hasPermission(req, res, next);

        let departmentId = req.params.id;
        console.log(departmentId);
    
        try {
            let department = await departmentManager.getDepartmentById(departmentId);
            if (department.length === 0) {
                return res.status(200).json({ message: "Cannot find department" });
            }
    
            //if department found, update department information
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
    
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    
    }


}

module.exports = DepartmentController;