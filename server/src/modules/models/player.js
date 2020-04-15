const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');
const { Event } = require('./event');
const { Game } = require('./game');
const { User } = require('./user');

/**
 * @extends Model
 */
class Player extends Model { }

Player.init({
    userId: {
        primaryKey: true,
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id',
        },
    },
    gameId: {
        primaryKey: true,
        type: DataTypes.UUID,
        references: {
            model: Game,
            key: 'id',
        },
    },
    eventId: {
        type: DataTypes.UUID,
        references: {
            model: Event,
            key: 'id',
        },
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isWinner: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deck: {
        type: DataTypes.JSONB,
    },
}, {
    sequelize,
    modelName: 'Player',
    indexes: [
        {
            fields: ['deck'],
            using: 'gin',
        },
    ],
});

module.exports = {
    Player,
};
