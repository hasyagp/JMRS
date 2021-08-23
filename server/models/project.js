const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Project = sequelize.define("projects", {
    project_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    due_date: {
        type: DataTypes.DATE
    }
},
    {
        timestamps: false
    }
)

module.exports = Project;