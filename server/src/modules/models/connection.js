const config = require('config');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    config.get('database.database'),
    config.get('database.user'),
    config.get('database.password'),
    {
        host: config.get('database.host'),
        port: config.get('database.port'),
        dialect: 'postgres',
    },
);

module.exports = {
    sequelize,
};
