const { STRING, JSONB, UUIDV4 } = require('sequelize');

const User = {
    name: 'user',
    schema: {
        id: {
            type: UUIDV4,
            primaryKey: true,
        },
        name: {
            type: STRING,
        },
        saved_decks: {
            type: JSONB,
        },
    },
    options: {},
};

module.exports = {
    User,
};
