const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const assignee = require("../models/user");

const Task = sequelize.define("task", {
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
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    assignee_id: {
        type: DataTypes.INTEGER

    },
    completedAt: {
        type: DataTypes.DATE
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
});

Task.hasOne(assignee, { foreignKey: 'id' });
// Task.belongsTo(assignee, { foreignKey: 'id' });

module.exports = Task;