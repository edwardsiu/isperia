const { DATE, INTEGER, JSONB, UUIDV4 } = require('sequelize');

const Season = {
    name: 'season',
    schema: {
        id: {
            type: UUIDV4,
            primaryKey: true,
        },
        hub_id: {
            type: UUIDV4,
            allowNull: false,
        },
        season_number: {
            type: INTEGER,
        },
        season_start: {
            type: DATE,
            allowNull: false,
        },
        season_end: {
            type: DATE,
            allowNull: false,
        },
        season_stats: {
            type: JSONB,
        },
    },
    options: {},
};

module.exports = {
    Season,
};
