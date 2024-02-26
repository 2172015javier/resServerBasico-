
const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'EL nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'EL correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROL', 'USER_ROL'] 
    },
    estado: {
        type: Boolean   ,
        default: true
    },
    google: {
        type: Boolean,
        default:false
    },
    
    
});

UsuarioSchema.methods.toJSON = function(){
    const { __v, password, ...usuario } = this.toObject(); 
    return usuario
}

module.exports = model('Usuario', UsuarioSchema);