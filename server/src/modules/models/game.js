const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');
const { Event } = require('./event');

/**
 * @extends Model
 */
class Game extends Model { }

Game.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    eventId: {
        type: DataTypes.UUID,
        references: {
            model: Event,
            key: 'id',
        },
    },
    source: {
        type: DataTypes.STRING,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'game',
});

module.exports = {
    Game,
};
