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
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    eventId: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Event,
            key: 'id',
        },
    },
    lfg: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    lfgTimestamp: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    properties: {
        type: DataTypes.JSONB,
        defaultValue: {},
    },
}, {
    sequelize,
    modelName: 'event_member',
});

module.exports = {
    EventMember,
};
