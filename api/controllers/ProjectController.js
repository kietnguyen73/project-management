const ProjectManager = require('../managers/ProjectManager');
const projectManager = new ProjectManager();
const hasPermission = require('../policies/hasPermission');

class ProjectController {

    async findProjectById(req, res, next) {
        
        hasPermission(req, res, next);
    
        let departmentId = req.params.id;

        try {
            let project = await projectManager.getProjectById(departmentId);
            if (project.length === 0) {
                return res.status(200).json({ message: "Cannot find project" });
            }
            return res.status(200).json({ project });
    
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    findAll(req, res, next) {

        hasPermission(req, res, next);

        projectManager.getAllProject()
            .then(project => {
                return res.status(200).json({ project });
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            });
    }

    createProject(req, res, next) {
       
        hasPermission(req, res, next);

        projectManager.insertProject(req.body)
        .then(result => {
            return res.status(200).json({ message: "Inserted project successfully" });
        })
        .catch(err => {
            return res.status(500).json({ message: err });
        });
    }


    deleteProject(req, res, next) {
        
        hasPermission(req, res, next);

        let departmentId = req.params.id;

        projectManager.removeProject(departmentId)
            .then(result => {
                if (result[0] === 1) {
                    return res.status(200).json({ message: "Deleted project successfully" });
                }
                return res.status(500).json({ message: "Deleted project failed" });
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            });
    }

    
    async updateProject(req, res, next) {

        hasPermission(req, res, next);

        let departmentId = req.params.id;
        console.log(departmentId);
    
        try {
            let project = await projectManager.getProjectById(departmentId);
            if (project.length === 0) {
                return res.status(200).json({ message: "Cannot find project" });
            }
    
            projectManager.updateProjectById(departmentId, req.body)
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
    
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    
    }


}

module.exports = ProjectController;