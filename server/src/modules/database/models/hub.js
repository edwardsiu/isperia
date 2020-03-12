const { INTEGER, STRING, UUID, UUIDV4 } = require('sequelize');

const Hub = {
    name: 'hub',
    schema: {
        id: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
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
