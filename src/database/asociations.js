const Role = require('../models/Role.model');
const Usuario = require('../models/User.model');

//Role - User
Role.hasOne(Usuario, {
    foreignKey: 'rol_id'
});
Usuario.belongsTo(Role);
