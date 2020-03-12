const { INTEGER, STRING, UUIDV4 } = require('sequelize');

const Hub = {
    name: 'hub',
    schema: {
        id: {
            type: UUIDV4,
            primaryKey: true,
        },
        name: {
            type: STRING,
            allowNull: false,
        },
        current_season: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    options: {},
};

module.exports = {
    Hub,
};
