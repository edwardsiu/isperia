const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');
const { Hub } = require('./hub');

/**
 * @extends Model
 */
class Event extends Model {}

Event.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    hubId: {
        type: DataTypes.UUID,
        references: {
            model: Hub,
            key: 'id',
        },
    },
    name: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
    settings: {
        type: DataTypes.JSONB,
    },
}, {
    sequelize,
    modelName: 'Event',
    indexes: [
        {
            name: 'name_index',
            using: 'BTREE',
            fields: ['name'],
        },
    ],
});

module.exports = {
    Event,
};
