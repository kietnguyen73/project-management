const bcrypt = require('bcrypt');
const EmployeeManager = require('../managers/EmployeeManager');
const employeeManager = new EmployeeManager();
const hasPermission = require('../policies/hasPermission');


class EmployeeController {

    async findEmployeeById(req, res, next) {

        try {
            let result = await hasPermission(req, res, next);
            if (result) {
                let employeeId = req.params.id;
                let employee = await employeeManager.getEmployeeById(employeeId);
                if (employee.length === 0) {
                    return res.status(200).json({ message: "Cannot find employee" });
                }
                return res.status(200).json({ employee });
            } else {
                return res.status(403).json({ message: "Have not permission to access this resource" });
            }
        } catch (err) {
            return res.status(500).json({ message: err });
        }

    }

    async findAll(req, res, next) {
        console.log("here");
        try {
            let result = await hasPermission(req, res, next);
            console.log(result);
            if (result) {
                employeeManager.getAllEmployee()
                    .then(employee => {
                        return res.status(200).json({ employee });
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

    async createEmployee(req, res, next) {
                    
        try {
            let result = await hasPermission(req, res, next);
            if (result) {
                let user = await employeeManager.findUserByUserName(req.body.username);
                let email = await employeeManager.findUserByEmail(req.body.email);

                if(user && user.length === 1) {
                    return res.status(200).json({ message: "Username already exists"});
                }

                if(email && email.length === 1) {
                    return res.status(200).json({ message: "Email already exists"});
                }

                //hash password before saving in DB
                bcrypt.hash(req.body.password, 10, function (err, hash) {

                    if (err) return res.status(500).json({ error: err });

                    req.body.password = hash;
                    req.body.avatar = req.file ? req.file.path : null;

                    employeeManager.insertEmployee(req.body)
                        .then(result => {
                            return res.status(200).json({ message: "Inserted employee successfully" });
                        })
                        .catch(err => {
                            return res.status(500).json({ message: err });
                        });
                });

            } else {
                return res.status(403).json({ message: "Have not permission to access this resource" });
            }
        } catch (err) {
            return res.status(500).json({ message: err });
        }


    }

    createEmployee2(employee) {

        //hash password before saving in DB
        let hash = bcrypt.hashSync(employee.password, 10);
        
        employee.password = hash;

        return employeeManager.insertEmployee(employee);
    }


    async deleteEmployee(req, res, next) {
        try {
            let result = await hasPermission(req, res, next);
            if(result) {
                let employeeId = req.params.id;

                employeeManager.removeEmployee(employeeId)
                    .then(result => {
                        if (result[0] === 1) {
                            return res.status(200).json({ message: "Deleted employee successfully" });
                        }
                        return res.status(500).json({ message: "Deleted employee failed" });
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


    async updateEmployee(req, res, next) {

        try {
            let result = hasPermission(req, res, next);
            if(result) {
                let employeeId = req.params.id;
                let employee = await employeeManager.getEmployeeById(employeeId);
                if (employee.length === 0) {
                    return res.status(200).json({ message: "Cannot find this employee" });
                }
                if (req.body.employeeId) {
                    if (req.body.employeeId != employeeId) {
                        return res.status(200).json({ message: "Employee ID must the same" });
                    }
                }
                //if employee found, update employee information
                employeeManager.updateEmployeeById(employeeId, req.body)
                    .then(result => {
                        if (result[0] === 1) {
                            return res.status(200).json({ message: "Updated employee successfully" });
                        }
                        return res.status(500).json({ message: "Updated employee failed" });

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

module.exports = EmployeeController;