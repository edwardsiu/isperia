const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');

/**
 * @extends Model
 */
class Report extends Model { }

Report.init({
    name: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    data: {
        type: DataTypes.JSONB,
    },
}, {
    sequelize,
    modelName: 'report',
});

module.exports = {
    Report,
};
