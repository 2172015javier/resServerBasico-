const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");

const router = Router();

router.post("/login",[
    check('correo', 'EL correo es obligatorio').isEmail(),
    check('password', 'La contraseña es  obligatorio').not().isEmpty(),
    validarCampos
] ,login);
router.post("/google",[
    check('id_token', 'id_Token de google es necesario').not().isEmpty(),
    validarCampos
] ,googleSignIn);

module.exports = router;
