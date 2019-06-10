const ProjectManager = require('../managers/ProjectManager');
const projectManager = new ProjectManager();
const hasPermission = require('../policies/hasPermission');

class ProjectController {

    async findProjectById(req, res, next) {

        try {

            let status =  await hasPermission(req, res, next);
            console.log("status" +status);
            if (status) {

                let projectId = req.params.id;
                let project = await projectManager.getProjectById(projectId);

                if (project.length === 0) {
                    return res.status(200).json({ message: "Cannot find project" });
                }
                return res.status(200).json({ project });
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
                projectManager.getAllProject()
                    .then(project => {
                        console.log("back here");
                        return res.status(200).json({ project });
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

    async createProject(req, res, next) {

        try {

            let status = await hasPermission(req, res, next);

            if(status) {
                projectManager.insertProject(req.body)
                .then(result => {
                    return res.status(200).json({ message: "Inserted project successfully" });
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


    async deleteProject(req, res, next) {

        try {
            
            let status = await hasPermission(req, res, next);
            if(status) {
                let projectId = req.params.id;

                projectManager.removeProject(projectId)
                    .then(result => {
                        if (result[0] === 1) {
                            return res.status(200).json({ message: "Deleted project successfully" });
                        }
                        return res.status(500).json({ message: "Deleted project failed" });
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


    async updateProject(req, res, next) {
        
        try {
            
            let status = await hasPermission(req, res, next);
            if(status) {
                let projectId = req.params.id;
                let project = await projectManager.getProjectById(projectId);

                if (project.length === 0) {
                    return res.status(200).json({ message: "Cannot find project" });
                }
                if (req.body.projectId) {
                    if (req.body.projectId != projectId) {
                        return res.status(200).json({ message: "Project ID must the same" });
                    }
                }
                projectManager.updateProjectById(projectId, req.body)
                    .then(result => {
                        console.log(result[0]);
                        if (result[0] === 1) {
                            return res.status(200).json({ message: "Updated project successfully" });
                        }
                        return res.status(500).json({ message: "Updated project failed" });

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

module.exports = ProjectController;