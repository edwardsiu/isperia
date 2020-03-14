const { BOOLEAN, STRING, JSONB, UUID } = require('sequelize');

const Player = {
    name: 'player',
    schema: {
        user_id: {
            type: UUID,
            primaryKey: true,
        },
        game_id: {
            type: UUID,
            primaryKey: true,
        },
        hub_id: {
            type: UUID,
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
        },
        commander: {
            type: JSONB,
        },
        decklist: {
            type: JSONB,
        },
    },
    options: {},
};

module.exports = {
    Player,
};
