const path = require("path");
const { v4: uuidv4 } = require("uuid");
const subirArchivo = (
  files,
  extensionesPermitidas = ["png", "jpg", "jpeg", "gif", "pdf"],
  carpeta = ""  
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split(".");
    console.log(nombreCortado);
    const extesion = nombreCortado[nombreCortado.length - 1];
    // Validar la extension

    if (!extensionesPermitidas.includes(extesion)) {
      return reject(
        `La extension ${extesion} no es permitida, ${extensionesPermitidas}`
      );
    }

    const nombreTemporalArchivo = uuidv4() + "." + extesion;

    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      carpeta,
      nombreTemporalArchivo
    );

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(nombreTemporalArchivo);
    });
  });
};

module.exports = {
  subirArchivo,
};
