const express = require('express');
const router = express.Router();
const ProjectController = require('../api/controllers/ProjectController');
const projectController = new ProjectController();
const Auth = require('../api/controllers/AuthController');


router.use(Auth.authenticate);

router.post('/', projectController.createProject);

router.get('/', projectController.findAll);

router.get('/:id', projectController.findProjectById);

router.put('/:id', projectController.updateProject);

router.delete('/:id', projectController.deleteProject);


module.exports = router;
