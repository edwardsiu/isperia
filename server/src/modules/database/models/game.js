const { BOOLEAN, STRING, UUID, UUIDV4 } = require('sequelize');

const Game = {
    name: 'game',
    schema: {
        id: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        hub_id: {
            type: UUID,
        },
        source: {
            type: STRING,
        },
        is_verified: {
            type: BOOLEAN,
            defaultValue: false,
        },
    },
    options: {},
};

module.exports = {
    Game,
};
