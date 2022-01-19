const { Schema } = require('mongoose');

const avance = new Schema({

    /*idAvance: {
        type:String,
        require: true,
        unique: true
    },*/
    idProyecto: {
        type: Schema.Types.ObjectId,
        ref: "proyectos"
    },
    fechaAvance: {
        type: Date,
        default: new Date()
    },
    descripcion: {
        type: String
    },
    observacion: {
        type: String
    }

})

module.exports = avance;