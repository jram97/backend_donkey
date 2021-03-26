const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const User = sequelize.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre_completo: {
        type: DataTypes.STRING(60),
    },
    usuario: {
        type: DataTypes.STRING(50),
        unique: true,
    },
    correo: {
        type: DataTypes.TEXT,
        unique: true,
    },
    contrasena: {
        type: DataTypes.TEXT
    },
    telefono: {
        type: DataTypes.STRING(30),
    },
    intentos: {
        type: DataTypes.INTEGER,
        defaultValue: 3
    },
    rol_id: {
        type: DataTypes.INTEGER,
    },
    activo: {
        type: DataTypes.BOOLEAN,
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
User.sync({ force: true })
module.exports = User;