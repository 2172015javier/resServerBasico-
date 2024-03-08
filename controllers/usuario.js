const { response, request } = require("express");
const Usuario = require("../models/usuarios");
const bcrypt = require("bcryptjs/dist/bcrypt");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 4, desde = 0 } = req.query;
  const query = {estado:true}
  
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite)),
  ])
  res.json({
   total,
   usuarios
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;
  // TODO validarcontra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.status(403).json({
    msg: "put API -- controlador",
    id,
    usuario,
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
const usuarioDelete = async(req=request, res = response) => {
    const {id} = req.params;
    //Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    
    res.json(usuario);



  }

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuarioDelete,
};
