const express = require('express');
const router = express.Router();
const SprintController = require('../api/controllers/SprintController');
const sprintController = new SprintController();
const Auth = require('../api/controllers/AuthController');


router.use(Auth.authenticate);

router.post('/', sprintController.createSprint);

router.get('/', sprintController.findAll);

router.get('/:id', sprintController.findSprintById);

router.put('/:id', sprintController.updateSprint);

router.delete('/:id', sprintController.deleteSprint);




module.exports = router;
