const { response } = require("express");
const Usuario = require('../models/usuarios');
const bcryptjs = require("bcryptjs");
const generarJWT = require("../helpers/generarJWT");

const login = async(req, res = response) => {
  const { correo, password } = req.body;

  try {

    //verificar email
    const usuario = await Usuario.findOne({correo});
    if(!usuario){
        return res.status(400).json({
            msg: 'Usuario _ password no son correctos - correo'
        })
    }

    // si el usuario esta activo
    if(!usuario.estado ){
        return res.status(400).json({
            msg: 'Usuario _ password no son correctos - estado False'
        })
    }

    // verificar la contraseña
    const valiPassword = bcryptjs.compareSync(password, usuario.password);
    if(!valiPassword){
        return res.status(400).json({
            msg: 'Usuario password no son correctos - password'
        }) 
    }

    // generar jwt
    const token = await generarJWT(usuario.id)

    res.json({
        usuario,
        token 
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
