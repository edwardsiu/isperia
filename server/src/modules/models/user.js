const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');

/**
 * @extends Model
 */
class User extends Model {}

User.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
    },
    savedDecks: {
        type: DataTypes.JSONB,
        defaultValue: {},
    },
}, {
    sequelize,
    modelName: 'User',
});

module.exports = {
    User,
};
