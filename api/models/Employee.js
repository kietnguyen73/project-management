module.exports = function (database, Sequelize) {
    const Employee = database.define('employee', {
        employeeId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'employee_id'
        },
        type: {
            type: Sequelize.ENUM('Employee'),
            allowNull: false,
            defaultValue: 'Employee'
        },
        username: {
            type: Sequelize.STRING(50),
            allowNull: true,
            unique: true,
            field: 'user_name'
        },
        password: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        firstName: {
            type: Sequelize.STRING(50),
            allowNull: false,
            field: 'first_name'
        },
        lastName: {
            type: Sequelize.STRING(50),
            allowNull: false,
            field: 'last_name'
        },
        fullName: {
            type: Sequelize.STRING(50),
            allowNull: true,
            field: 'full_name'
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true
        },
        avatar: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'avatar'
        },
        phone: {
            type: Sequelize.STRING(15),
            allowNull: true,
            field: 'phone_number'
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
    return Employee;
}