const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    'spmm',
    'postgres',
    'tes1234',
    {
        host: "localhost",
        dialect: "postgresql",
    }
);

sequelize.sync({});


module.exports = sequelize;
