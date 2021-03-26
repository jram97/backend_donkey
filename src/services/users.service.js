const pool = require('../database/db');
const User = require('../models/User.model');
const { serviceResponse, updateFormat } = require('../libs/functions');
const Role = require('../models/Role.model');

const service = {};

service.create = async (nombre_completo, usuario, correo, contrasena, telefono, rol_id = 4, activo) => {
    try {
        const newUser = await User.create({ nombre_completo, usuario, correo, contrasena, telefono, rol_id, activo });

        if (!newUser) {
            return serviceResponse(false, "No se ha podido crear el usuario");
        }

        return serviceResponse(true, newUser);
    } catch (error) {
        throw error;
    }
};

service.getByUsuario = async (usuario) => {
    try {
        const user = await User.findOne({ where: { usuario: usuario }, include: { all: true } });
        if (user === null) {
            return serviceResponse(false, {});
        }

        return serviceResponse(true, user);
    } catch (error) {
        console.log(error);
    }
}

service.getAll = async () => {
    try {
        const users = await User.findAll({ order: ['created_at'], include: { all: true } });

        if (users.length < 1) {
            return serviceResponse(false, []);
        }

        return serviceResponse(true, users);
    } catch (error) {
        console.log(error);
    }
}

service.update = async (id, campos) => {
    try {
        const updated = await User.update(campos, {
            where: {
                id: id
            }
        });

        if (!updated) {
            return serviceResponse(false, "No se ha podido actualizar");
        }

        return serviceResponse(true, campos);
    } catch (error) {
        console.log(error);
    }
}

module.exports = service;