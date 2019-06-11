const express = require('express');
const router = express.Router();
const TaskController = require('../api/controllers/TaskController');
const taskController = new TaskController();
const Auth = require('../api/controllers/AuthController');


router.use(Auth.authenticate);

router.post('/', taskController.createTask);

router.get('/', taskController.findAll);

router.get('/:id', taskController.findTaskById);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);


module.exports = router;
