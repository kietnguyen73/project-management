module.exports = function(database, Sequelize) {
    const Role = database.define('role', {
        roleId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'role_id'
        },
        roleName: {
            type: Sequelize.STRING(100),
            allowNull: false,
            defaultValue: false,
            field: 'role_name'
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
    return Role;
}