const { STRING, JSONB } = require('sequelize');

const Player = {
    name: 'player',
    schema: {
        url: { type: STRING },
        commander: { type: STRING },
        decklist: { type: JSONB },
    },
    options: {},
};

module.exports = {
    Player,
};
