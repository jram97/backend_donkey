const userService = require('../services/users.service');
const key = require('../config').key;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

exports.JwtStrategy = new JwtStrategy(opts, async (payload, done) => {
    console.log("Usuario autenticado", payload);
    const response = await userService.getByUsuario(payload.usuario)
    if (!response.status) {
        return done(null, false);
    }
    
    return done(null, response.data);
});