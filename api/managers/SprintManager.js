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
            }
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

}

module.exports = SprintManager;