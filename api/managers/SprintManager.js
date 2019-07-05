const db = require('../models/associations/model-associations');
const Sprint = db.Sprint;

class SprintManager {
    
    insertSprint(sprint) {
        return Sprint.create(sprint);
    }

    removeSprint(sprintId) {
        return Sprint.update({
            isDeleted: 1
        }, {
            where: {
                sprintId: sprintId
            }
        });
    }

    getAllSprint() {
        return Sprint.findAll({
            where: {
                isDeleted: 0,
            },
            include: [{ model: db.Project }, { model: db.Task}]
        });
    }

    getSprintById(sprintId) {
        return Sprint.findAll({
            where: {
                sprintId: sprintId
            },
            include: [{ model: db.Project }, { model: db.Task}]
        });
    }

    updateSprintById(sprintId, sprint) {
        return Sprint.update(
           sprint
        , {
            where: {
                sprintId: sprintId
            }
        });
    }

    getSprintBySprintName(sprintName) {
        return Sprint.findAll({
            where: {
                sprintName: sprintName
            }
        });
    }

    async isExisted(sprint) {
        let message = [];
        if(sprint.sprintName) {
            let sprintName = await this.getSprintBySprintName(sprint.sprintName);
            if(sprintName && sprintName.length > 0) 
                message.push("Sprint already exists");
        }
        return message;
    }

}

module.exports = SprintManager;