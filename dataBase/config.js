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

    console.log("Base de datos");
  } catch (error) {
    console.log(error);

    throw new Error("Error  a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConexion,
};
