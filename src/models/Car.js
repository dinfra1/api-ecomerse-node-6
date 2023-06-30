const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Car = sequelize.define('car', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //UserId
    //ProducId
});

module.exports = Car;