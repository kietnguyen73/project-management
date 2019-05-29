const express = require('express');
const router = express.Router();
const employeeController = require('../api/controllers/EmployeeController');
const Auth = require('../api/controllers/AuthController');

// router.use(Auth.authenticate);

router.get('/', employeeController.findAll);

router.get('/:id', employeeController.findEmployeeById);

router.post('/', employeeController.createEmployee);

router.put('/:id', employeeController.updateEmployee);

router.delete('/:id', employeeController.deleteEmployee);


module.exports = router;
