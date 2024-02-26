const { Router } = require("express");
const { check } = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");
const { 
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuarioDelete,
} = require("../controllers/usuario");
const { esRolValido, emailExiste } = require("../helpers/db-validators");
const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);
router.post('/',[
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('correo', 'El correo no es valido').isEmail(),
  check('correo').custom( emailExiste) ,
  check('password', 'El password debe tener mas de 6 letras').isLength({min: 6}),
  check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),

  check('rol').custom(esRolValido),
  validarCampos,

], usuariosPost)
router.delete("/", usuarioDelete);

module.exports = router;
