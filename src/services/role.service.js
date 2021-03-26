const pool = require('../database/db');
const { serviceResponse, updateFormat } = require('../libs/functions');
const Role = require('../models/Role.model');

const service = {};

service.create = async (nombre) => {
    try {
        const newRole = await Role.create({ nombre });

        if(!newRole){
            return serviceResponse(false, "No se ha podido insertar");
        }
        return serviceResponse(true, newRole);
    } catch (error) {
        throw (error);
    }
}

service.getById = async (id) => {
    try {
        const role = await Role.findByPk(id);

        if(!role){
            return serviceResponse(false, 'No existe rol con ese id');
        }
        return serviceResponse(true, role);
    } catch (error) {
        throw error;
    }
}

service.getAll = async () => {
    try {
        const roles = await Role.findAll();

        if(roles.length < 1){
            return serviceResponse(false, "No se encontraron resultados");
        }
        return serviceResponse(true, roles);
    } catch (error) {
        throw error;
    }
}

service.update = async (id, campos) => {
    try {
        const updated = await Role.update(campos, {
            where: {
                id
            }
        });

        if(!updated){
            return serviceResponse(false, "No se ha podido actualizar");
        }
        return serviceResponse(true, campos);
    } catch (error) {
        throw error;
    }
}

module.exports = service;