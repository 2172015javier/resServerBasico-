const cors = require('cors');
const express = require('express');
const { dbConexion } = require('../dataBase/config');
require('dotenv').config();

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.autPath = '/api/auth';
        

        // Conectar a base de datos
        this.conectarDB();


        //middleawares
        this.middlewares();

        this.routes();
    }

    async conectarDB(){
        await dbConexion();
    }

    middlewares(){
        //cors
        this.app.use(cors());
        // directorio publico
        this.app.use(express.static('public'));

        // lectura y parseo del body

        this.app.use(express.json())
    }
    routes(){
        this.app.use(this.autPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuario'));
    }

    listem (){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en ${this.port}`);
    })}
}

module.exports = Server