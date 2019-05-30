const bcrypt = require('bcrypt');
const EmployeeManager = require('../managers/EmployeeManager');
const employeeManager = new EmployeeManager();
const hasPermission = require('../policies/hasPermission');

class EmployeeController {

    async findEmployeeById(req, res, next) {

        hasPermission(req, res, next);
    
        let employeeId = req.params.id;
        try {
            let employee = await employeeManager.getEmployeeById(employeeId);
            if (employee.length === 0) {
                return res.status(200).json({ message: "Cannot find employee" });
            }
            return res.status(200).json({ employee });
    
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    findAll(req, res, next) {

        hasPermission(req, res, next);

        employeeManager.getAllEmployee()
            .then(employee => {
                return res.status(200).json({ employee });
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            });
    }

    createEmployee(req, res, next) {
       
        hasPermission(req, res, next);

        //hash password before saving in DB
        bcrypt.hash(req.body.password, 10, function (err, hash) {
    
            if (err) return res.status(500).json({ error: err });
    
            req.body.password = hash;
    
            employeeManager.insertEmployee(req.body)
                .then(result => {
                    return res.status(200).json({ message: "Inserted employee successfully" });
                })
                .catch(err => {
                    return res.status(500).json({ message: err });
                });
        });
    }


    deleteEmployee(req, res, next) {
        
        hasPermission(req, res, next);

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
    }

    
    async updateEmployee(req, res, next) {

        hasPermission(req, res, next);

        let employeeId = req.params.id;
    
        try {
            let employee = await employeeManager.getEmployeeById(employeeId);
            if (employee.length === 0) {
                return res.status(200).json({ message: "Cannot find this employee" });
            }
    
            //if employee found, update employee information
            employeeManager.updateEmployeeById(employeeId, req.body)
                    .then(result => {
                        console.log(result[0]);
                        if (result[0] === 1) {
                            return res.status(200).json({ message: "Updated employee successfully" });
                        }
                        return res.status(500).json({ message: "Updated employee failed" });
    
                    })
                    .catch(err => {
                        return res.status(500).json({ message: err });
                    });
    
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    
        employeeManager.getEmployeeById(employeeId)
            .then(employee => {
                console.log(employee.length);
                if (employee.length === 0) {
                    return res.status(400).json({ message: "Cannot find this employee" });
                }
    
    
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            });
    }


}

module.exports = EmployeeController;