module.exports = function(database, Sequelize) {
    const Task = database.define('task', {
        taskId : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'task_id'
        },
        taskName : {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
            field: 'task_name'
        },
        estimateTime: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'estimate_time'
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'start_date'
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'end_date'
        },
        status: {
            type: Sequelize.ENUM('Opened', 'In Progress', 'In Review', 'QA', 'Closed'),
            allowNull: false,
            defaultValue: 'Opened',
            field:  'status'
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return Sequelize.NOW;
            },
            field: 'created_date'
        },
        updatedDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return Sequelize.NOW;
            },
            field: 'updated_date'
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'is_deleted'
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: '1',
            field: 'created_by'
        }
        
    }, {
        timestamps: false
    });
    return Task;
}