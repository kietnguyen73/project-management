const TaskManager = require('../managers/TaskManager');
const taskManager = new TaskManager();
const hasPermission = require('../policies/hasPermission');

class TaskController {

    async findTaskById(req, res, next) {

        try {

            let status =  await hasPermission(req, res, next);
            console.log("status" +status);
            if (status) {

                let taskId = req.params.id;
                let task = await taskManager.getTaskById(taskId);

                if (task.length === 0) {
                    return res.status(200).json({ message: "Cannot find task" });
                }
                return res.status(200).json({ task });
            } else {
                return res.status(403).json({ message: "Have not permission to access this resource" });
            }

        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    async findAll(req, res, next) {

        try {
            let status = await hasPermission(req, res, next);
            console.log("status" +status);
            if (status) {
                taskManager.getAllTask()
                    .then(task => {
                        console.log("back here");
                        return res.status(200).json({ task });
                    })
                    .catch(err => {
                        return res.status(500).json({ message: err });
                    });
            } else {
                return res.status(403).json({ message: "Have not permission to access this resource" });
            }

        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    async createTask(req, res, next) {

        try {

            let status = await hasPermission(req, res, next);

            if(status) {
                taskManager.insertTask(req.body)
                .then(result => {
                    return res.status(200).json({ message: "Inserted task successfully" });
                })
                .catch(err => {
                    return res.status(500).json({ message: err });
                });
            } else {
                return res.status(403).json({ message: "Have not permission to access this resource" });
            }
        } catch(err) {
            return res.status(500).json({ message: err });
        }
        
    }


    async deleteTask(req, res, next) {

        try {
            
            let status = await hasPermission(req, res, next);
            if(status) {
                let taskId = req.params.id;

                taskManager.removeTask(taskId)
                    .then(result => {
                        if (result[0] === 1) {
                            return res.status(200).json({ message: "Deleted task successfully" });
                        }
                        return res.status(500).json({ message: "Deleted task failed" });
                    })
                    .catch(err => {
                        return res.status(500).json({ message: err });
                    });
            } else {
                return res.status(403).json({ message: "Have not permission to access this resource" });
            }
            
        } catch(err) {
            return res.status(500).json({ message: err });
        }
        
    }


    async updateTask(req, res, next) {
        
        try {
            
            let status = await hasPermission(req, res, next);
            if(status) {
                let taskId = req.params.id;
                let task = await taskManager.getTaskById(taskId);

                if (task.length === 0) {
                    return res.status(200).json({ message: "Cannot find task" });
                }
                if (req.body.taskId) {
                    if (req.body.taskId != taskId) {
                        return res.status(200).json({ message: "Task ID must the same" });
                    }
                }
                taskManager.updateTaskById(taskId, req.body)
                    .then(result => {
                        console.log(result[0]);
                        if (result[0] === 1) {
                            return res.status(200).json({ message: "Updated task successfully" });
                        }
                        return res.status(500).json({ message: "Updated task failed" });

                    })
                    .catch(err => {
                        return res.status(500).json({ message: err });
                    });
            } else {
                return res.status(403).json({ message: "Have not permission to access this resource" });
            }

        } catch (err) {
            return res.status(500).json({ message: err });
        }

    }


}

module.exports = TaskController;