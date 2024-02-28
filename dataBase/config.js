const mongoose = require('mongoose');

const dbConexion = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_CNN,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("Conexión a la base de datos establecida correctamente");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    throw new Error("Error al conectar a la base de datos");
  }
};

module.exports = {
  dbConexion,
};
