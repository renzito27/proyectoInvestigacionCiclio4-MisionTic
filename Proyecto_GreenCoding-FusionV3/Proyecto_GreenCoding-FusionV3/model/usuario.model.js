const { Schema, model } = require('mongoose');

const usuarios = new Schema({
    
    id: {
        type: String,
        require: true,
        unique: true
    },
    nombre: {
        type: String,
        require: true
    },
    estado: {
        type: String,
        enum: ['Autorizado', 'NoAutorizado', 'Pendiente'],
        default: 'Pendiente'
    },
    correo: {
        type: String,
        require: true
    },
    clave: {
        type: String,
        require: true
    },
    tipo: {
        type: String,
        enum: ['Administrador', 'Estudiante', 'Lider'],
        require: true
    }
});

module.exports = model('usuarios', usuarios)