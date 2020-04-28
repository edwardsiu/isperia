const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');
const { Event } = require('./event');
const { User } = require('./user');

/**
 * @extends Model
 */
class EventMember extends Model { }

EventMember.init({
    userId: {
        primaryKey: true,
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id',
        },
    },
    eventId: {
        primaryKey: true,
        type: DataTypes.UUID,
        references: {
            model: Event,
            key: 'id',
        },
    },
    lfg: {
        type: DataTypes.BOOLEAN,
    },
    lfgTimestamp: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    properties: {
        type: DataTypes.JSONB,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'event_member',
});

module.exports = {
    EventMember,
};
