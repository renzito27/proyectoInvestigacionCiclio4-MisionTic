const { Schema, model } = require('mongoose');
const estudianteInscrito = require('./estudianteInscrito.model');
const avance = require('./avance.model');

const proyectos = new Schema({

    idProyecto: {
        type:String,
        require: true,
        unique: true
    },
    nombreProyecto: {
        type: String,
        require: true
    },
    objGeneral: {
        type: String
    },
    objEspecifico: {
        type: String
    },
    presupuesto: {
        type: Number
    },
    fechaInicio: {
        type: Date,
        default: new Date()
    },
    fechaTermina: {
        type: Date
    },
    lider: {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        require: true
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Inactivo'
    },
    fase: {
        type: String,
        enum: ['Iniciado', 'EnDesarrollo', 'Terminado', 'Nulo'],
        default: 'Nulo'
    },
    estudiantesInscritos: [
        estudianteInscrito
    ],
    avances: [
        avance
    ]

});

module.exports = model('proyectos', proyectos)