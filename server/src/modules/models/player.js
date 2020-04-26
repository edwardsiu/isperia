const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');
const { Event } = require('./event');
const { Game } = require('./game');
const { User } = require('./user');

/**
 * @typedef {Object} Card
 * @property {string} name
 * @property {number} quantity
 */

/**
 * @typedef {Object} Deck
 * @property {string} name
 * @property {Object.<string, Boolean>} archetypes
 * @property {Object.<string, Card>} commanders
 * @property {Object.<string, Card>} mainboard
 * @property {Object.<string, Card>} sideboard
 */

/**
 * @typedef {Object} Player
 * @property {string} userId
 * @property {string} gameId
 * @property {string} eventId
 * @property {boolean} isVerified
 * @property {boolean} isWinner
 * @property {Deck} deck
 */

/**
 * @extends Model
 */
class Player extends Model {}

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
