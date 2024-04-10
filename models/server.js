const cors = require("cors");
const express = require("express");
const { dbConexion } = require("../dataBase/config");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      buscar: "/api/buscar",
      categorias: "/api/categorias",
      productos: "/api/productos",
      usuarios: "/api/usuarios"
    };

    // Conectar a base de datos
    this.conectarDB();

    //middleawares
    this.middlewares();

    this.routes();
  }

  async conectarDB() {
    await dbConexion();
  }

  middlewares() {
    //cors
    this.app.use(cors());
    // directorio publico
    this.app.use(express.static("public"));

    // lectura y parseo del body

    this.app.use(express.json());
  }
  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.productos, require("../routes/productos"));
    this.app.use(this.paths.usuarios, require("../routes/usuario"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en ${this.port}`);
    });
  }
}

module.exports = Server;
