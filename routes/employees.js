const express = require('express');
const router = express.Router();
const employeeController = require('../api/controllers/EmployeeController');

router.post('/', employeeController.createEmployee);

router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
