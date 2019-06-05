const Sequelize = require('../../../database/db').Sequelize;
const db = require('../../../database/db').db;

const database = {};

database.Employee = require('../Employee')(db, Sequelize);
database.Role = require('../Role')(db, Sequelize);
database.Permission = require('../Permission')(db, Sequelize);
database.RolePermission = require('../RolePermission')(db, Sequelize);
database.Department = require('../Department')(db, Sequelize);
database.Project = require('../Project')(db, Sequelize);



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


module.exports = database;