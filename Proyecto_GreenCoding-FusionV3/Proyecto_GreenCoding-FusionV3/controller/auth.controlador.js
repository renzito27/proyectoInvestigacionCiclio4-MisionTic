const Usuario = require('../model/usuario.model')
let aes256 = require('aes256');
const configAuth = require('../config/auth.config')
const jwt = require('jsonwebtoken')
const authKey = configAuth.AUTH;
const jwtKey = configAuth.JWT;

const signIn = async (correo,clave) => {

    try {
        const usuario = await Usuario.findOne({ correo})
        if (!usuario) {
            return {"value":"Verifique usuario y contraseña"} 
        }

        const claveDesencriptada = aes256.decrypt(authKey, usuario.clave);
        if ( clave !== claveDesencriptada ) {
            return {"value":"Verifique usuario y contraseña"}
        }
        
        const token = jwt.sign({
            perfil: usuario.tipo,
            estado: usuario.estado,
            id:usuario._id
        }, jwtKey, { expiresIn: 60 * 60 * 2 }) // 2 horas

        return {"value":token}
    } catch (error) {
        console.log(error)
        return  {"value":"Contacte al administrador" }
    }
}

module.exports = signIn