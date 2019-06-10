const Sequelize = require('../../../database/db').Sequelize;
const db = require('../../../database/db').db;

const database = {};

database.Employee = require('../Employee')(db, Sequelize);
database.Role = require('../Role')(db, Sequelize);
database.Permission = require('../Permission')(db, Sequelize);
database.RolePermission = require('../RolePermission')(db, Sequelize);
database.Department = require('../Department')(db, Sequelize);
database.Project = require('../Project')(db, Sequelize);
database.Task = require('../Task')(db, Sequelize);
database.Sprint = require('../Sprint')(db, Sequelize);
database.Comment = require('../Comment')(db, Sequelize);
database.EmployeeProject = require('../EmployeeProject')(db, Sequelize);


database.Permission.belongsToMany(database.Role, {
    through: {
        model: database.RolePermission,
    },
    foreignKey: 'permission_id'

});

database.Role.belongsToMany(database.Permission, {
    through: {
        model: database.RolePermission,
    },
    foreignKey: 'role_id'
});

database.Role.hasMany(database.Employee, {foreignKey: 'role_id'});

database.Department.hasMany(database.Project, {foreignKey: 'department_id'});
database.Project.belongsTo(database.Department,{foreignKey: 'department_id'});

database.Department.hasMany(database.Employee, {foreignKey: 'department_id'});
database.Employee.belongsTo(database.Department, {foreignKey: 'department_id'});

database.Department.hasMany(database.Project, {foreignKey: 'department_id'});
database.Project.belongsTo(database.Department, {foreignKey: 'department_id'});

database.Employee.belongsToMany(database.Project, {
    through: {
        model: database.EmployeeProject,
    },
    foreignKey: 'employeeId'
});

database.Project.belongsToMany(database.Employee, {
    through: {
        model: database.EmployeeProject,
    },
    foreignKey: 'projectId'
});

database.Employee.hasMany(database.Task, {foreignKey: 'employeeId'});
database.Task.belongsTo(database.Employee, {foreignKey: 'employeeId'});

database.Project.hasMany(database.Task, {foreignKey: 'projectId'});
database.Task.belongsTo(database.Project, {foreignKey: 'projectId'});

database.Sprint.hasMany(database.Task, {foreignKey: 'sprintId'});
database.Task.belongsTo(database.Sprint, {foreignKey: 'sprintId'});

database.Project.hasMany(database.Sprint, {foreignKey: 'projectId'});
database.Sprint.belongsTo(database.Project, {foreignKey: 'projectId'});

database.Task.hasMany(database.Comment, {foreignKey: 'taskId'});
database.Comment.belongsTo(database.Task, {foreignKey: 'taskId'});

database.Employee.hasMany(database.Comment, {foreignKey: 'employeeId'});
database.Comment.belongsTo(database.Employee, {foreignKey: 'employeeId'});






module.exports = database;