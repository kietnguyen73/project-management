module.exports = function(database, Sequelize) {
    const Permission = database.define('permission', {
        permissionId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'permission_id'
        },
        permissionCode: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
            defaultValue: false,
            field: 'permission_code'
        },
        description: {
            type: Sequelize.STRING(100),
            allowNull: false,
            defaultValue: false,
            field: 'description'
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
    return Permission;
}