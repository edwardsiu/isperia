const { STRING, JSONB } = require('sequelize');

const Player = {
    name: 'player',
    schema: {
        url: { type: STRING },
        commander: { type: JSONB },
        decklist: { type: JSONB },
    },
    options: {},
};

module.exports = {
    Player,
};
