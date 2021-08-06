const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = require("../models/user");
const Task = require("../models/task");

const Comment = sequelize.define("comments", {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

Task.hasMany(Comment, { foreignKey: 'task_id' });
Comment.belongsTo(Task, { foreignKey: 'task_id' })

module.exports = Comment;