const express = require('express');
const router = express();
const Permission = require('../api/controllers/PermissionController');
const permission = new Permission();

router.get('/importData', permission.importProject);


module.exports = router;