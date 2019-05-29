const Sequelize = require('../../../database/db').Sequelize;
const db = require('../../../database/db').db;

const database = {};

database.Employee = require('../Employee')(db, Sequelize);
database.Role = require('../Role')(db, Sequelize);
database.Permission = require('../Permission')(db, Sequelize);
database.RolePermission = require('../RolePermission')(db, Sequelize);

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

module.exports = database;