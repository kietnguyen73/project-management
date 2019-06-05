const express = require('express');
const router = express.Router();
const RoleController = require('../api/controllers/RoleController');
const roleController = new RoleController();
const Auth = require('../api/controllers/AuthController');

router.post('/', roleController.createRole);

router.use(Auth.authenticate);

router.get('/', roleController.findAll);

router.get('/:id', roleController.findRoleById);

router.put('/:id', roleController.updateRole);

router.delete('/:id', roleController.deleteRole);


module.exports = router;
