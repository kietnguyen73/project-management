const db = require('../models/associations/model-associations');
const Project = db.Project;

class ProjectManager {
    
    insertProject(project) {
        return Project.create(project);
    }

    removeProject(projectId) {
        return Project.update({
            isDeleted: 1
        }, {
            where: {
                projectId: projectId
            }
        });
    }

    getAllProject() {
        return Project.findAll({
            where: {
                isDeleted: 0,
            },
            include: [{ model: db.Department }]
        });
    }

    getProjectById(projectId) {
        return Project.findAll({
            where: {
                projectId: projectId
            }
        });
    }

    updateProjectById(projectId, project) {
        return Project.update(
           project
        , {
            where: {
                projectId: projectId
            }
        });
    }

}

module.exports = ProjectManager;