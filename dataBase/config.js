const mongoose = require('mongoose');

const dbConexion = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      // La opción useNewUrlParser ya no es necesaria y está obsoleta
      // La opción useUnifiedTopology es ahora la predeterminada y no necesita ser especificada
    });

    console.log("Conexión a la base de datos establecida correctamente");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error.message);
    throw new Error("Error al iniciar la base de datos");
  }
};

module.exports = {
  dbConexion,
};
