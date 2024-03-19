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

const googleSignIn = async (req, res) => {
  const { id_token } = req.body;
  try {
    const { nombre, img, correo } = await googleVerify(id_token);
    let usuario = await Usuario.findOne({ correo });
    if (usuario === null) {
     
      // Si el usuario no existe en la base de datos, se crea
      const data = {
        nombre,
        correo,
        password: "2222222",
        rol: 'USER_ROLE',
        img,
        google: true,
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    // Si el usuario está marcado como inactivo en la base de datos
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario borrado",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    // Enviar la respuesta con el usuario y el token
    res.json({
      token,
      usuario,
    });
  } catch (error) {
    // Si ocurre un error al verificar el token
    res.status(400).json({
      msg: "El token no pudo ser verificado",
      ok: false,
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
