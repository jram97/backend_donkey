const { validationResult } = require('express-validator');

const validator = {};

validator.runValiation = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ error: errors.array().map((item) => item.msg) });
    }
    next();
};

module.exports = validator;