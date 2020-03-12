const { BOOLEAN, STRING, JSONB, UUID, UUIDV4 } = require('sequelize');

const Player = {
    name: 'player',
    schema: {
        id: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        user_id: {
            type: UUID,
        },
        game_id: {
            type: UUID,
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
