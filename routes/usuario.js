
const {Router} = require('express');
const { usuariosGet, usuariosPut, usuarioPost, usuarioDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);
router.post('/', usuarioPost);
router.delete('/', usuarioDelete);

module.exports = router