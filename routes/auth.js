const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");

const router = Router();

router.post("/login",[
    check('correo', 'EL correo es obligatorio').isEmail(),
    check('password', 'La contraseña es  obligatorio').not().isEmpty(),
    validarCampos
] ,login);

module.exports = router;
