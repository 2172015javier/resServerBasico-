const { response, request } = require("express");
const Usuario = require("../models/usuarios");
const bcrypt = require("bcryptjs/dist/bcrypt");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const usuariosGet =
  ("/",
  (req = request, res = response) => {
    const params = req.query;
    res.status(403).json({
      msg: "get API -- controlador",
      params,
    });
  });

const usuariosPut = async(req, res = response) => {
  const { id } = req.params;
  const { password, google, ...resto } = req.body;
  // TODO validarcontra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    const usuario = await Usuario.findByIdAndUpdate(id, resto );
  }
  res.status(403).json({
    msg: "put API -- controlador",
    id,
  });
};
const usuariosPost = async (req, res = response) => {
  // const errors = validationResult(req);
  // if(!errors.isEmpty()){
  //   return res.status(400).json(errors );
  // }
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //verificar si el correo existe

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  //guardar en DB
  await usuario.save();

  res.json({
    usuario,
  });
};
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
