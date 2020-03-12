const { BOOLEAN, STRING, JSONB, UUIDV4 } = require('sequelize');

const Player = {
    name: 'player',
    schema: {
        id: {
            type: UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: UUIDV4,
        },
        game_id: {
            type: UUIDV4,
        },
        hub_id: {
            type: UUIDV4,
        },
        is_verified: {
            type: BOOLEAN,
            defaultValue: false,
        },
        is_winner: {
            type: BOOLEAN,
            defaultValue: false,
        },
        url: {
            type: STRING,
            allowNull: false,
        },
        commander: {
            type: JSONB,
            allowNull: false,
        },
        decklist: {
            type: JSONB,
            allowNull: false,
        },
    },
    options: {},
};

module.exports = {
    Player,
};
