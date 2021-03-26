const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Role = sequelize.define('rol', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(8),
        unique: true,
    }
},{
    underscored:true,
    timestamps: false,
    freezeTableName: true,
});

Role.sync({ force: true })

module.exports = Role;