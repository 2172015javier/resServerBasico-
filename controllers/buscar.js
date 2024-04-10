const { response } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require("mongoose").Types;

const coleccionesPermitidas = ["usuarios", "categoria", "productos", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }
  const regex = new RegExp(termino, "i");
  const total = await Usuario.countDocuments({
    $or: [{ nombre: regex }, { correo: regex }],
  });
  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });
  res.json({
    total,
    results: usuarios,
  });
};
const buscarCategorias = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const categoria = await Categoria.findById(termino).populate('usuario', 'nombre');
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }
  const regex = new RegExp(termino, "i");
  const total = await Categoria.countDocuments({
    $or: [{ nombre: regex }, { correo: regex }],
  });
  const categorias = await Categoria.find({
    $or: [{ nombre: regex }],
  }).populate('usuario', 'nombre');
  res.json({
    total,
    results: categorias,
  });
};

const buscarProducto = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const productos = await Producto.findById(termino).populate(
      "categoria",
      "nombre",
    );

    return res.json({
      results: productos ? [productos] : [],
    });
  }
  const regex = new RegExp(termino, "i");
  const total = await Producto.countDocuments({
    $or: [{ nombre: regex }, { correo: regex }],
  });
  const productos = await Producto.find({
    $or: [{ nombre: regex }],
  }).populate(
    "categoria",
    "nombre",
  ).populate("usuario", "nombre");
  res.json({
    total,
    results: productos,
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas} `,
    });
  }
  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categoria":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProducto(termino, res);
      break;
    default:
      res.status(500).json({
        msg: "se le olvido hacer esta buscqueda",
      });
  }
};

module.exports = {
  buscar,
};
