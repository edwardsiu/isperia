const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');

/**
 * @extends Model
 */
class Community extends Model { }

Community.init({
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
        defaultValue: {},
    },
}, {
    sequelize,
    modelName: 'Community',
});

module.exports = {
    Community,
};
