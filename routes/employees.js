const express = require('express');
const router = express.Router();
const EmployeeController = require('../api/controllers/EmployeeController');
const employeeController = new EmployeeController();
const Auth = require('../api/controllers/AuthController');
const hasPermission = require('../api/policies/hasPermission');



router.post('/', employeeController.createEmployee);

router.use(Auth.authenticate);

router.get('/', employeeController.findAll);

router.get('/:id', employeeController.findEmployeeById);

router.put('/:id', employeeController.updateEmployee);

router.delete('/:id', employeeController.deleteEmployee);


module.exports = router;
