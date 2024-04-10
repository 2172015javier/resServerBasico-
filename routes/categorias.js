const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
const validarJWT = require("../middlewares/validar-jwt");
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require("../controllers/categorias");
const { existeCategoriaId, existeUsuaroPorId } = require("../helpers/db-validators");
const { esAdminRole } = require("../middlewares/validar-roles");

const router = Router();
// Obtener todas las categorias
router.get("/", obtenerCategorias);
// Obtener una categoria por ID
router.get("/:id", [
  check('id', 'no es un id de mongo').isMongoId(),
  check('id').custom(existeCategoriaId),
  validarCampos
] ,obtenerCategoria);
// crear una nueva categoria
router.post("/",[
  validarJWT,
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearCategoria);
// Actualizar un registro por id
router.put("/:id",[
  validarJWT,
  check('nombre', 'EL nombre es obligatorio').not().isEmpty(),
  check('id').custom(existeCategoriaId),
  validarCampos
] ,actualizarCategoria);
// Borrar una categoria solo si es un - Admin
router.delete("/:id",[
  validarJWT,
  esAdminRole,
  check('id', 'No es un id: de mongo').isMongoId(),
  check('id').custom(existeCategoriaId),
  validarCampos
],borrarCategoria);

module.exports = router;
