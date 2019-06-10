const express = require('express');
const router = express();
// const Permission = new require('../api/controllers/PermissionController')();
// const permission = new Permission();
const SeedData = require('../api/controllers/SeedData');
// router.use(router.parent.locals);

// router.get('/importData', function(req, res, next) {
//     console.log(router.parent.locals);
// });

router.get('/importData', SeedData.importSeedData);


module.exports = router;