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
            include: [{ model: db.Department }, { model: db.Sprint},  { model: db.Task, include: [{model: db.Employee, attributes: {
                exclude: ["password", "isDeleted", "roleId", "departmentId", "createdBy"]
            },}] }, { model: db.Employee, through: { attributes: []}, attributes: {
                exclude: ["password", "isDeleted", "roleId", "departmentId", "createdBy"]
            },}]
        });
    }

    getProjectById(projectId) {
        return Project.findAll({
            where: {
                projectId: projectId
            },
            include: [{ model: db.Department }, { model: db.Sprint},  { model: db.Task, include: [{model: db.Employee, attributes: {
                exclude: ["password", "isDeleted", "roleId", "departmentId", "createdBy"]
            },}] }, { model: db.Employee, through: { attributes: []}, attributes: {
                exclude: ["password", "isDeleted", "roleId", "departmentId", "createdBy"]
            },}]
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