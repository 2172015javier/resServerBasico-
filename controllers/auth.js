const { response, request, json } = require("express");
const Usuario = require("../models/usuarios");
const bcryptjs = require("bcryptjs");
const generarJWT = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //verificar email
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario _ password no son correctos - correo",
      });
    }

    // si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario _ password no son correctos - estado False",
      });
    }

    // verificar la contraseña
    const valiPassword = bcryptjs.compareSync(password, usuario.password);
    if (!valiPassword) {
      return res.status(400).json({
        msg: "Usuario password no son correctos - password",
      });
    }

    // generar jwt
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const  googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;
  try {
    const { nombre, img, correo } = await googleVerify(id_token);
    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      //teno que crearlo
      const data = {
        nombre,
        correo,
        password: "",
        img,
        google: true,
      };  
      usuario = new Usuario(data);
      await usuario.save();
    }
    //  si usuario en DB
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador usuario borrado",
      });
    }
    // generar el JWT
    // generar jwt
    const token = await generarJWT(usuario.id);
     res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "el token no se pudo verificar",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
