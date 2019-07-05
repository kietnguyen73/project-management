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

    getProjectByProjectCode(projectCode) {
        return Project.findAll({
            where: {
                projectCode: projectCode
            }
        });
    }

    getProjectByProjectName(projectName) {
        return Project.findAll({
            where: {
                projectName: projectName
            }
        });
    }

    async isExisted(project) {
        let message = [];
        if(project.projectCode) {
            let projectCode = await this.getProjectByProjectCode(project.projectCode);
            if(projectCode && projectCode.length > 0) 
                message.push("ProjectCode already exists");
        }
        if(project.projectName) {
            let projectName = await this.getProjectByProjectName(project.projectName);
            if(projectName && projectName.length > 0) 
                message.push("ProjectName already exists");
        }
        return message;
    }

}

module.exports = ProjectManager;