const { response } = require('../libs/functions');
const debug = require("debug")("app:error");

const handlers = {};

handlers.errorHandler = (error, req, res, next) => {
    debug(error);
    if (error.detail) {
        return res.status(400).json(response(false, error.detail));
    }
    return res.status(400).json(response(false, error));
};

module.exports = handlers;