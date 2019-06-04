module.exports = function(database, Sequelize) {
    const Department = database.define('department', {
        departmentId : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'department_id'
        },
        departmentCode: {
            type: Sequelize.STRING(50),
            allowNull: false,
            defaultValue: false,
            field: 'department_code'
        },
        departmentName : {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
            field: 'department_name'
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
    return Department;
}