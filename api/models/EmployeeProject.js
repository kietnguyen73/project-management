module.exports = function(database, Sequelize) {
    const EmployeeProject = database.define('employee_project', {
        employeeProject: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'employee_project_id'
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
    return EmployeeProject;
}