const SprintManager = require('../managers/SprintManager');
const sprintManager = new SprintManager();
const hasPermission = require('../policies/hasPermission');

class SprintController {

    async findSprintById(req, res, next) {

        try {

            let status =  await hasPermission(req, res, next);
            console.log("status" +status);
            if (status) {

                let sprintId = req.params.id;
                let sprint = await sprintManager.getSprintById(sprintId);

                if (sprint.length === 0) {
                    return res.status(200).json({ message: "Cannot find sprint" });
                }
                return res.status(200).json({ sprint });
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
            if (status) {
                sprintManager.getAllSprint()
                    .then(sprint => {
                        return res.status(200).json({ sprint });
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

    async createSprint(req, res, next) {

        console.log("create sprint");
        try {
            let status = await hasPermission(req, res, next);
            console.log(status);
            if(status) {
                sprintManager.insertSprint(req.body)
                .then(result => {
                    return res.status(200).json({ message: "Inserted sprint successfully" });
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


    async deleteSprint(req, res, next) {

        try {
            
            let status = await hasPermission(req, res, next);
            if(status) {
                let sprintId = req.params.id;

                sprintManager.removeSprint(sprintId)
                    .then(result => {
                        if (result[0] === 1) {
                            return res.status(200).json({ message: "Deleted sprint successfully" });
                        }
                        return res.status(500).json({ message: "Deleted sprint failed" });
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


    async updateSprint(req, res, next) {
        
        try {
            
            let status = await hasPermission(req, res, next);
            if(status) {
                let sprintId = req.params.id;
                let sprint = await sprintManager.getSprintById(sprintId);

                if (sprint.length === 0) {
                    return res.status(200).json({ message: "Cannot find sprint" });
                }
                if (req.body.sprintId) {
                    if (req.body.sprintId != sprintId) {
                        return res.status(200).json({ message: "Sprint ID must the same" });
                    }
                }
                sprintManager.updateSprintById(sprintId, req.body)
                    .then(result => {
                        console.log(result[0]);
                        if (result[0] === 1) {
                            return res.status(200).json({ message: "Updated sprint successfully" });
                        }
                        return res.status(500).json({ message: "Updated sprint failed" });

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

module.exports = SprintController;