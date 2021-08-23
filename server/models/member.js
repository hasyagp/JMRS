const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = require("../models/user");
const Project = require("../models/project");

const Member = sequelize.define("members", {
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false
})

User.hasMany(Member, { foreignKey: 'user_id' });
Member.belongsTo(User, { foreignKey: 'user_id' });

Project.hasMany(Member, { foreignKey: 'project_id', as: 'projectUser', });
Member.belongsTo(Project, { foreignKey: 'project_id', as: 'projectUser', })

module.exports = Member;