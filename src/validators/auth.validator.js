const { check } = require('express-validator');

const validator = {};

validator.loginValidator = [
    check('usuario').notEmpty().withMessage("El campo usuario no debe estar vacio"),
    check('contrasena').notEmpty().withMessage('El campo contrasena no debe estar vacio')
];

validator.registerValidator = [

    check('nombre_completo').notEmpty().withMessage('El campo nombre no puede estar vacio'),
    check('correo').notEmpty().withMessage('El campo correo no puede estar vacio')
        .isEmail().withMessage('El campo correo, debe ser un correo valido'),
    check('usuario').notEmpty().withMessage('El campo usuario no debe estar vacio'),
    check('contrasena').notEmpty().withMessage('El campo contrasena no puede estar vacio'),
    check('telefono').notEmpty().withMessage('El campo telefono no puede estar vacio'),
];

module.exports = validator;