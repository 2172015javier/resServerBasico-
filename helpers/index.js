
const dbValidators = require('./db-validators');
const generarJWT = require('./generarJWT');
const googleverify = require('./google-verify');
const subirArchivo = require('./subir-archiv');

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleverify,
    ...subirArchivo
}