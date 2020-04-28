const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');
const { Community } = require('./community');

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
    communityId: {
        type: DataTypes.UUID,
        references: {
            model: Community,
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
    modelName: 'event',
});

module.exports = {
    Event,
};
