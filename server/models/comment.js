const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const user = require("../models/user");
const task = require("../models/task");

const Comment = sequelize.define("comment", {
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

Comment.hasOne(user, { foreignKey: 'id' });
Comment.hasOne(task, { foreignKey: 'id' });

module.exports = Comment;