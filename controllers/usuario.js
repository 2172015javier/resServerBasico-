const { response, request } = require('express');
const Usuario = require("../models/usuarios");
const bcrypt = require("bcryptjs/dist/bcrypt");
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');

const usuariosGet =
  ("/",
  (req = request, res = response) => {
    const params = req.query;
    res.status(403).json({
      msg: "get API -- controlador",
      params,
    });
  });

const usuariosPut =
  ("/",
  (req, res = response) => {
    const { id } = req.params;
    res.status(403).json({
      msg: "put API -- controlador",
      id,
    });
  });
  const usuariosPost = async(req, res = response) => {
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //   return res.status(400).json(errors );
    // }
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
      return res.status(400).json({
        msg: 'EL correo ya esta registrado '
      })
    }
    //Encriptar la contraseña
    const salt  = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //guardar en DB
    await usuario.save();

    res.json({
      usuario
    });
}
const usuarioDelete =
  ("/appi",
  (req, res = response) => {
    res.status(403).json({
      msg: "delete API -- controlador",
    });
  });

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuarioDelete,
};
