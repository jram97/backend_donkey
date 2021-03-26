const rolService = require('../services/role.service');

const { response } = require('../libs/functions');
const { roleVerifier } = require('../middlewares/roleVerifier');

const controller = {};

controller.create = async (req, res, next) => {
    try {
        const { nombre } = req.body;

        const user = await rolService.create(nombre);

        if (!user.status) {
            return res.status(400).json(response(false, user.data));
        }

        return res.status(201).json(response(true, "Rol creado con exito"));
    } catch (error) {
        next(error);
    }
}

controller.getAll = async (req, res, next) => {
    try {
        const roles = await rolService.getAll();

        if (!roles.status) {
            return res.status(400).json(response(false, roles.data, []));
        }

        return res.status(201).json(response(true, "Exito", roles.data));
    } catch (error) {
        next(error);
    }
}

controller.getById = async (req, res, next) => {
    try {
        const role = await rolService.getById(req.params.id);

        if (!role.status) {
            return res.status(400).json(response(false, role.data, {}));
        }

        return res.status(201).json(response(true, "Exito", role.data));
    } catch (error) {
        next(error);
    }
}

controller.update = async (req, res, next) => {
    try {
        const { id, nombre } = req.body;
        const toUpdate = { nombre };

        const exist = await rolService.getById(id);

        if (!exist.status) {
            return res.status(400).json(response(false, 'No existe un rol con ese id'));
        }

        const updated = await rolService.update(id, toUpdate);

        if (!updated.status) {
            return res.status(400).json(response(false, `No se ha podido actualizar el rol: ${updated.data}`));
        }

        return res.status(200).json(
            response(true, "Usuario actualizado con exito", {
                campos_actualizados: {
                    nombre
                }
            })
        );


    } catch (error) {
        next(error);
    }
}

module.exports = controller;