const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');

/**
 * @extends Model
 */
class Hub extends Model { }

Hub.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
    },
    settings: {
        type: DataTypes.JSONB,
    },
}, {
    sequelize,
    modelName: 'Hub',
});

module.exports = {
    Hub,
};
