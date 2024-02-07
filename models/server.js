const cors = require('cors');
const express = require('express');
require('dotenv').config();

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //middleawares
        this.middlewares();

        this.routes();
    }

    middlewares(){
        //cors
        this.app.use(cors());
        this.app.use(express.static('public'));

        // lectura y parseo del body

        this.app.use(express.json())
    }
    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuario'))
    }

    listem (){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en ${this.port}`);
    })}
}

module.exports = Server