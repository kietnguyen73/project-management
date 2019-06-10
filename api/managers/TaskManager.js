const db = require('../models/associations/model-associations');
const Task = db.Task;

class TaskManager {
    
    insertTask(task) {
        return Task.create(task);
    }

    removeTask(taskId) {
        return Task.update({
            isDeleted: 1
        }, {
            where: {
                taskId: taskId
            }
        });
    }

    getAllTask() {
        return Task.findAll({
            where: {
                isDeleted: 0,
            },
            include: [{ model: db.Department }, { model: db.Task}]
        });
    }

    getTaskById(taskId) {
        return Task.findAll({
            where: {
                taskId: taskId
            }
        });
    }

    updateTaskById(taskId, task) {
        return Task.update(
           task
        , {
            where: {
                taskId: taskId
            }
        });
    }

}

module.exports = TaskManager;