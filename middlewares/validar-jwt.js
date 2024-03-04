const { response } = require('express');

jwt = require('jsonwebtoken'); 

const validarJWT = (req ,res =response, next)=>{
    const token = req.header('x-token');
    console.log(token);
    next();
    

}

module.exports = validarJWT;