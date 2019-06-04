const express = require('express');
const router = express.Router();
const DepartmentController = require('../api/controllers/DepartmentController');
const departmentController = new DepartmentController();
const Auth = require('../api/controllers/AuthController');


router.use(Auth.authenticate);

router.post('/', departmentController.createDepartment);

router.get('/', departmentController.findAll);

router.get('/:id', departmentController.findDepartmentById);

router.put('/:id', departmentController.updateDepartment);

router.delete('/:id', departmentController.deleteDepartment);


module.exports = router;
