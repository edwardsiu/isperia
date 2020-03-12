const { BOOLEAN, STRING, UUIDV4 } = require('sequelize');

const Game = {
    name: 'game',
    schema: {
        id: {
            type: UUIDV4,
            primaryKey: true,
        },
        hub_id: {
            type: UUIDV4,
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
