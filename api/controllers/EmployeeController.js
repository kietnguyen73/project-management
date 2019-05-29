const bcrypt = require('bcrypt');
const Manager = require('../managers/EmployeeManager');
const manager = new Manager();


module.exports.findEmployeeById = async (req, res, next) => {
    let employeeId = req.params.id;
    try {
        let employee = await manager.getEmployeeById(employeeId);
        if (employee.length === 0) {
            return res.status(200).json({ message: "Cannot find employee" });
        }
        return res.status(200).json({ employee });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.findAll = (req, res, next) => {
    console.log(req.route);
    console.log(req.baseUrl);
    manager.getAllEmployee()
        .then(employee => {
            return res.status(200).json({ employee });
        })
        .catch(err => {
            return res.status(500).json({ message: err });
        });
}


module.exports.createEmployee = (req, res, next) => {
    console.log(req.body);

    //hash password before saving in DB
    bcrypt.hash(req.body.password, 10, function (err, hash) {

        if (err) return res.status(500).json({ error: err });

        req.body.password = hash;

        manager.insertEmployee(req.body)
            .then(result => {
                return res.status(200).json({ message: "Inserted employee successfully" });
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            });
    });

}

module.exports.deleteEmployee = (req, res, next) => {
    let employeeId = req.params.id;
    console.log(employeeId);
    manager.removeEmployee(employeeId)
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

module.exports.updateEmployee = async (req, res, next) => {

    let employeeId = req.params.id;

    try {
        let employee = await manager.getEmployeeById(employeeId);
        if (employee.length === 0) {
            return res.status(200).json({ message: "Cannot find this employee" });
        }

        //if employee found, update employee information
        manager.updateEmployeeById(employeeId, req.body)
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

    manager.getEmployeeById(employeeId)
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