const { response, request } = require('express');

usuariosGet = ('/', (req = request, res = response)=>{
    const params = req.query;
    res.status(403).json({
        msg: 'get API -- controlador',
        params
    });
});

const usuariosPut =  ('/', (req, res= response)=>{
    const {id} = req.params;
    res.status(403).json({
        msg: 'put API -- controlador',
        id
    });
});

const usuarioPost = ('/', (req, res= response)=>{
    const {nombre, age}  = req.body;
    res.status(403).json({

        msg: 'post API -- controlador',
        nombre,
        age
    });
});
const usuarioDelete = ('/appi', (req, res = response)=>{
    res.status(403).json({
        msg: 'delete API -- controlador'
    });
});


module.exports = {
    usuariosGet,
    usuariosPut,
    usuarioPost,
    usuarioDelete

}