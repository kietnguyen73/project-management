module.exports = function(database, Sequelize) {
    const Project = database.define('project', {
        projectId : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'project_id'
        },
        projectCode: {
            type: Sequelize.STRING(50),
            allowNull: false,
            field: 'project_code'
        },
        projectName : {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
            field: 'project_name'
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return Sequelize.NOW;
            },
            field: 'start_date'
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'end_date'
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
    return Project;
}