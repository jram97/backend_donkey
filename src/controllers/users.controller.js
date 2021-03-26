const userService = require('../services/users.service');

const { response } = require('../libs/functions');

const controller = {};

controller.getAll = async (req, res, next) => {
    try {
        const users = await userService.getAll();

        if (!users.status) { return res.status(400).json(response(false, "No se encontraron resultados")); }

        return res.status(200).json(
            response(true, "Exito", { users: users.data })
        );
    } catch (error) {
        next(error);
    }
}

controller.update = async (req, res, next) => {
    try {
        const { nombre_completo, usuario, correo, telefono } = req.body;
        const toUpdate = { nombre_completo, usuario, correo, telefono };
        const updated = await userService.update(req["user"].id, toUpdate);

        if (!updated.status) {
            return res.status(400).json(response(false, `No se ha podido actualizar el usuario: ${updated.data}`));
        }

        return res.status(200).json(
            response(true, "Usuario actualizado con exito", {
                campos_actualizados: {
                    nombre_completo, usuario, correo, telefono
                }
            })
        );

    } catch (error) {
        next(error);
    }
}

controller.activate = async (req, res, next) => {
    try {
        const { usuario } = req.params;
        const user = await userService.getByUsuario(usuario);

        if (!user.status) {
            return res.status(400).json(response(false, user.data));
        }

        if (user.data.activo) {
            return res.status(201).json(response(false, "Tu cuenta ya ha sido activada con anterioridad!"));
        }

        const updated = await userService.update(user.data.id, { activo: true });

        if(!updated.status){
            return res.status(400).json(response(false, `No se ha podido activar el usuario: ${user.data}`));
        }

        return res.status(201).json(response(true, "La cuenta se ha activado con exito"));
    } catch (error) {
        next(error);
    }
}

module.exports = controller;