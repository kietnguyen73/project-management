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
    foreignKey: {
        name: 'permissionId',
        field: 'permission_id'
    }
});

database.Role.belongsToMany(database.Permission, {
    through: {
        model: database.RolePermission,
    },
    foreignKey: {
        name: 'roleId',
        field: 'role_id'
    } 
});

database.Role.hasMany(database.Employee, {
    foreignKey: {
        name: 'roleId',
        field: 'role_id'
    } 
});

database.Department.hasMany(database.Project, {
    foreignKey: {
        name: 'departmentId',
        field: 'department_id'
    }
});
database.Project.belongsTo(database.Department,{
    foreignKey: {
        name: 'departmentId',
        field: 'department_id'
    }
});

database.Department.hasMany(database.Employee, {
    foreignKey: {
        name: 'departmentId',
        field: 'department_id'
    }
});
database.Employee.belongsTo(database.Department, {
    foreignKey: {
        name: 'departmentId',
        field: 'department_id'
    }
});

database.Department.hasMany(database.Project, {
    foreignKey: {
        name: 'departmentId',
        field: 'department_id'
    }
});
database.Project.belongsTo(database.Department, {
    foreignKey: {
        name: 'departmentId',
        field: 'department_id'
    }
});

database.Employee.belongsToMany(database.Project, {
    through: {
        model: database.EmployeeProject,
    },
    foreignKey: {
        name: 'employeeId',
        field: 'employee_id'
    }
});

database.Project.belongsToMany(database.Employee, {
    through: {
        model: database.EmployeeProject,
    },
    foreignKey: {
        name: 'projectId',
        field: 'project_id'
    }
});

database.Employee.hasMany(database.Task, {
    foreignKey: {
        name: 'employeeId',
        field: 'assigned_to'
    }
});
database.Task.belongsTo(database.Employee, { 
    foreignKey: {
        name: 'employeeId',
        field: 'assigned_to'
    }
});

database.Project.hasMany(database.Task, {
    foreignKey: {
        name: 'projectId',
        field: 'project_id'
    }
});
database.Task.belongsTo(database.Project, {
    foreignKey: {
        name: 'projectId',
        field: 'project_id'
    }
});

database.Sprint.hasMany(database.Task, {
    foreignKey: {
        name: 'sprintId',
        field: 'sprint_id'
    }
});
database.Task.belongsTo(database.Sprint, {
    foreignKey: {
        name: 'sprintId',
        field: 'sprint_id'
    }
});

database.Project.hasMany(database.Sprint, {
    foreignKey: {
        name: 'projectId',
        field: 'project_id'
    }
});
database.Sprint.belongsTo(database.Project, {
    foreignKey: {
        name: 'projectId',
        field: 'project_id'
    }
});

database.Task.hasMany(database.Comment, {
    foreignKey: {
        name: 'taskId',
        field: 'task_id'
    }
});
database.Comment.belongsTo(database.Task, {
    foreignKey: {
        name: 'taskId',
        field: 'task_id'
    }
});

database.Employee.hasMany(database.Comment, {
    foreignKey: {
        name: 'employeeId',
        field: 'commented_by'
    }
});
database.Comment.belongsTo(database.Employee, {
    foreignKey: {
        name: 'employeeId',
        field: 'commented_by'
    }
});





module.exports = database;