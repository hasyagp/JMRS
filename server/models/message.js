const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = require("../models/user");

const Message = sequelize.define("messages", {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

User.hasMany(Message, { foreignKey: 'sender_id', as: "senderUser" });
Message.belongsTo(User, { foreignKey: 'sender_id', as: "senderUser" });

User.hasMany(Message, { foreignKey: 'receiver_id', as: "receiverUser" });
Message.belongsTo(User, { foreignKey: 'receiver_id', as: "receiverUser" });

module.exports = Message;