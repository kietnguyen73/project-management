const express = require('express');
const multer = require('multer');
const router = express.Router();
const EmployeeController = require('../api/controllers/EmployeeController');
const employeeController = new EmployeeController();
const Auth = require('../api/controllers/AuthController');
const upload = require('../api/services/UploadImageService');

router.use(Auth.authenticate);

router.post('/', upload.single('avatar'), employeeController.createEmployee);

router.get('/', employeeController.findAll);

router.get('/:id', employeeController.findEmployeeById);

router.put('/:id', employeeController.updateEmployee);

router.delete('/:id', employeeController.deleteEmployee);



module.exports = router;

