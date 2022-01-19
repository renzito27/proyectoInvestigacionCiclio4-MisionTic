const Usuarios = require('../model/usuario.model');
const Proyectos = require('../model/proyecto.model');
const configAuth = require('../config/auth.config');
const signIn=require('../controller/auth.controlador')
const validarToken=require('../middleware/authjwt')
let aes256 = require('aes256');
var mongoose = require('mongoose');

const obtenerUsuarios = async () => await Usuarios.find({})
const obtenerUsuario = async (id) => {
    const t=await Usuarios.find({_id:mongoose.Types.ObjectId(id)})

    return t[0]
}


//HU_010
const obtenerEstudiantes = async () => await Usuarios.find({tipo:"Estudiante"})

//HU_005 y HU_011
const setEstadoUsuario = async (id, estado) => {
    console.log(id);
    return Usuarios.updateOne({id}, {estado})
        .then(res => `Estado actualizado`)
        .catch(err => "Falló el cambio de estado")
}

//HU_015A
const obtenerMisPostulaciones = async (id) => {
    const estudiante = await Usuarios.findOne({id})
        return await Proyectos.find({'estudiantesInscritos.estudiante': estudiante._id })
        .populate("lider")
        .populate("estudiantesInscritos.estudiante")
        .populate("estudiantesInscritos.proyecto", "nombreProyecto")
}

//HU_001
const key = configAuth.AUTH;
const crearUsuario = async (usuario) => {
    const { clave } = usuario;
            const nuevoUsuario = new Usuarios(usuario);
            const encryptedPlainText = aes256.encrypt(key, clave);
            nuevoUsuario.id=nuevoUsuario._id;
            nuevoUsuario.clave = encryptedPlainText
            return nuevoUsuario.save()
                .then(u => "Usuario creado")
                .catch(err => console.log(err));
}
const login = async (correo,clave) => {
    return signIn(correo,clave);
}
const ValidarToken = async (token) => {
    return validarToken.validarToken(token);
}

//HU_004
const SetModificarUsuario = async (id, nombre, correo, clave) => {
    const usuario = await Usuarios.findOne({id});
    if ( usuario ) {
        if (usuario.estado === "Autorizado") {
            const claveEncriptada = aes256.encrypt(key, clave);
            return Usuarios.updateOne({id}, {$set:{nombre: nombre, correo: correo, clave: claveEncriptada}})
                .then(res => `Usuario actualizado`)
                .catch(err => `Falló la actualización: ${err}`)
        } else {
            return res => "Usuario no autorizado"
        }
    } else {
        return res => "Usuario no válido para actualiación"
    }
}

module.exports = {
    setEstadoUsuario,
    obtenerEstudiantes,
    obtenerMisPostulaciones,
    crearUsuario,
    obtenerUsuarios,
    SetModificarUsuario,
    login,
    ValidarToken,
    obtenerUsuario
}
