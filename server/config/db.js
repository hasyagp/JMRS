const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//     'spmm',
//     'postgres',
//     'tes1234',
//     {
//         host: "localhost",
//         dialect: "postgresql",
//     }
// );

const uri = 'postgres://ildiyzxzjljiql:9f0792746ed58e839871c40869075a597fbe54fd0ac8bdfd69e139d3a8b03e83@ec2-44-194-145-230.compute-1.amazonaws.com:5432/d6fm0dl97d8a11';

const sequelize = new Sequelize(uri, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}
);

sequelize.sync({});


module.exports = sequelize;
