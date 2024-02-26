
const {Schema, model} = require('mongoose');
const { route } = require('../routes/usuario');

const RoleSchema = Schema({
    rol:{
        type: String,
        require: [ true, 'El rol es obligatorio']
    }
});

module.exports = model('Role', RoleSchema); 