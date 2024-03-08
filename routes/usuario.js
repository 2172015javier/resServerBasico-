const { Router } = require("express");
const { check } = require("express-validator");

const {validarCampos} = require("../middlewares/validar-campos");
const validarJWT = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require("../middlewares/validar-roles");

const { 
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuarioDelete,
} = require("../controllers/usuario");
const { esRolValido, emailExiste, existeUsuaroPorId } = require("../helpers/db-validators");
const router = Router();

router.get("/", usuariosGet);

router.put("/:id",[
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuaroPorId),
  check('rol').custom(esRolValido),

  validarCampos 
], usuariosPut);
router.post('/',[
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('correo', 'El correo no es valido').isEmail(),
  check('correo').custom( emailExiste) ,
  check('password', 'El password debe tener mas de 6 letras').isLength({min: 6}),
  check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']),
  check('rol').custom(esRolValido),

  validarCampos,

], usuariosPost)
router.delete("/:id",[
  validarJWT,
  esAdminRole,
  tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuaroPorId),
  validarCampos
], usuarioDelete);

module.exports = router;
