const { STRING, JSONB } = require('sequelize');

const Report = {
    name: 'report',
    schema: {
        name: {
            type: STRING,
            primaryKey: true,
        },
        data: {
            type: JSONB,
        },
    },
    options: {},
};

module.exports = {
    Report,
};
