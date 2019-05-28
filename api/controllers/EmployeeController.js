const bcrypt = require('bcrypt');
const Manager = require('../managers/EmployeeManager');
const manager = new Manager();

module.exports.createEmployee = function(req, res, next) {
    console.log(req.body);

    //hash password before saving in DB
    bcrypt.hash(req.body.password, 10, function(err, hash) {

        if(err) return res.status(500).json({error: err});

        req.body.password = hash;

        manager.insertEmployee(req.body)
               .then(result => {
                   return res.status(200).json({message: "Inserted employee successfully"});
               })
               .catch(err => {
                    return res.status(500).json({message: err});
               });
    });
    
}

module.exports.deleteEmployee = (req, res, next) => {
    let employeeId = req.params.id;
    console.log(employeeId);
    manager.removeEmployee(employeeId)
        .then(result => {
            return res.status(200).json({message: "Deleted employee successfully"});
        })
        .catch(err => {
            return res.status(500).json({message: err});
        });
}