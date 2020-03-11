const config = require('config');
const Sequelize = require('sequelize');
const models = require('./models');

class Database {
    constructor() {
        this.sequelize = new Sequelize(
            config.get('database.database'),
            config.get('database.user'),
            config.get('database.password'),
            {
                host: config.get('database.host'),
                port: config.get('database.port'),
                dialect: 'postgres',
            },
        );
        Object.entries(models).forEach(([key, model]) => {
            this[key] = this.sequelize.define(model.name, model.schema, model.options);
        });
    }

    async sync(options) {
        return this.sequelize.sync(options);
    }
}

module.exports = {
    Database,
};
