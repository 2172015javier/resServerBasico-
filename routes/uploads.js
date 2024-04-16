const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { cargarArchivo } = require("../controllers/uploads");

const router = Router();

router.post('/',[], cargarArchivo);

module.exports = router;
