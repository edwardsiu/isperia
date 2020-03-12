const { STRING, JSONB, UUID, UUIDV4 } = require('sequelize');

const User = {
    name: 'user',
    schema: {
        id: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
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
