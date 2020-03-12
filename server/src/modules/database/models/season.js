const { DATE, INTEGER, JSONB, UUID, UUIDV4 } = require('sequelize');

const Season = {
    name: 'season',
    schema: {
        id: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        hub_id: {
            type: UUID,
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
