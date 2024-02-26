const Role = require("../models/role");
const Usuario = require("../models/usuarios");

const esRolValido = async (rol = "") => {
  const existRol = await Role.findOne({ rol });
  if (existRol) {
    throw new Error(`EL rol ${rol} no esta registrado en la base de datos BD`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`el correo: ${correo} ya esta registrado`); 
  }
};

module.exports = {
  esRolValido,
  emailExiste,
};
