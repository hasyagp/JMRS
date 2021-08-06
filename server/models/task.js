const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("../models/user");

const Task = sequelize.define("tasks", {
    task_tittle: {
        type: DataTypes.STRING
    },
    due_date: {
        type: DataTypes.DATE
    },
    description: {
        type: DataTypes.TEXT
    },
    file: {
        type: DataTypes.STRING
    },
    filepath: {
        type: DataTypes.TEXT
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    assignee_id: {
        type: DataTypes.INTEGER
    },
    createdBy: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
});
// id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),

User.hasMany(Task, { foreignKey: "assignee_id", as: 'assignedUser', })
Task.belongsTo(User, { foreignKey: "assignee_id", as: 'assignedUser', })
User.hasMany(Task, { foreignKey: "createdBy", as: 'createdByUser', })
Task.belongsTo(User, { foreignKey: "createdBy", as: 'createdByUser', })

// User.belongsTo(Task, {
//     foreignKey: "assignee_id", // Column name of associated table
//     as: "tasks" // Alias for the table
// });


module.exports = Task;