const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userService = require('../services/users.service');
const { response } = require('../libs/functions');

const controller = {};

controller.register = async (req, res, next) => {
    try {
        const { nombre_completo, usuario, correo, contrasena, telefono, rol } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(contrasena, salt);

        const serviceResponse = await userService.create(nombre_completo, usuario, correo, hash, telefono, rol, false);

        if (!serviceResponse.status) { return res.status(400).json(response(false, "No se ha podido crear el usuario")); }

        return res.status(200).json(
            response(true, "Usuario creado con exito", {
                usuario: {
                    nombre_completo,
                    usuario,
                    correo,
                    telefono,
                    rol
                }
            })
        );
    } catch (error) {
        next(error);
    }
}

controller.login = async (req, res, next) => {
    try {
        const user = await userService.getByUsuario(req.body.usuario);

        if (!user.status) {
            return res.status(400).json(response(false, "Usuario no encontrado"));
        }

        if(!user.data.activo){
            return res.status(400).json(response(false, "Debes activar la cuenta"));
        }

        const match = await bcrypt.compare(req.body.contrasena, user.data.contrasena);

        if (match) {
            const token = jwt.sign({ id: user.data.id, correo: user.data.correo, usuario: user.data.usuario, rol: user.data.rol }, process.env.jwtsecret, {
                expiresIn: "1d",
            });

            return res.status(200).json(
                response(true, "Exito", {
                    usuario: {
                        id: user.data.id,
                        nombre_completo: user.data.nombre_completo,
                        usuario: user.data.usuario,
                        correo: user.data.correo,
                        telefono: user.data.telefono,
                        rol: user.data.rol,
                        token,
                    }
                })
            );
        }
        return res.status(400).json(response(false, "Contraseña incorrecta"));
    } catch (error) {
        next(error);
    }

}

controller.changePassword = async (req, res, next) => {
    try {
        const { usuario, oldPass, newPass } = req.body;

        const user = await userService.getByUsuario(usuario);

        if (!user.status) {
            return res.status(400).json(response(false, "No existe el usuario"));
        }

        if (!(await bcrypt.compare(oldPass, user.data.contrasena))) {
            return res.status(400).json(response(false, "Contraseña incorrecta"));
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPass, salt);

        const updated = await userService.update(user.data.id, { contrasena: hash });

        if (!updated.status) {
            return res.status(400).json(response(false, "No se ha podido cambiar la contraseña", updated.data));
        }

        return res.status(201).json(response(true, "Contraseña cambiada con exito"));
    } catch (error) {
        next(error);
    }
}

module.exports = controller;