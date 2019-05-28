const Manager = require('../managers/EmployeeManager');
const manager = new Manager();

module.exports.createEmployee = function(req, res, next) {
    console.log(req.body);
    manager.insertEmployee(req.body);
}