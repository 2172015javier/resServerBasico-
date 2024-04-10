const { response } = require("express");
const { Categoria, Usuario, Producto } = require("../models");
const Role = require("../models/role");

const esRolValido = async (rol = "") => {
  const existRol = await Role.findOne({ rol });
  if (!existRol) {
    throw new Error(`EL rol ${rol} no esta registrado en la base de datos BD`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`el correo: ${correo} ya esta registrado`);
  }
};

const existeUsuaroPorId = async (id = "") => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`EL ID: ${id} no existe`);
  }
};

//validador sobre categorias

const existeCategoriaId = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`EL id: ${id} no existe`);
  }
};
const existeProductoId = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`EL id: ${id} no existe`);
  }
};





module.exports = {
  esRolValido,
  emailExiste,
  existeUsuaroPorId,
  existeCategoriaId,
  existeProductoId
};
