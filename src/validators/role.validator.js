const { check, param } = require('express-validator');

const validator = {};

validator.createValidator = [
    check('nombre').notEmpty().withMessage('El campo nombre no puede ser vacio')
];

validator.updateValidator = [
    check('id').notEmpty().withMessage('El campo id no puede ser vacio')
];

module.exports = validator;