const jwt = require('jsonwebtoken')
const configAuth = require('../config/auth.config')
const jwtKey = configAuth.JWT;

const validarToken = (token) => {

    if (!token) {
        return {"value":"Token inválido" }
    }

    try {
        // vefificar jwt
        const data = jwt.verify(token, jwtKey)
        if (data) {
            //next();
            return {"value":"Token válido","perfil":data.perfil,"estado":data.estado,"token":token,"id":data.id}
        }
        return  {"value":"Token inválido" }

    } catch (error) {  
        return {"value":"Error al autorizar el token" }
    }



}

const admin = (req, next) => {
    if ( req.estado !== "Autorizado" || req.perfil !== "Administrador" ){
        return {"value":"Permisos insuficientes" }
    }
    next();
}

const estudiante = (req,next) => {
    if ( req.estado !== "Autorizado" || req.perfil !== "Estudiante" ){
        return {"value":"Permisos insuficientes" }
    }
    next();
}

const lider = (req, next) => {
    if ( req.estado !== "Autorizado" || req.perfil !== "Lider" ){
        return {"value":"Permisos insuficientes" }
    }
    next();
}

module.exports = {
    validarToken,
    admin,
    estudiante,
    lider
}