//const { argsToArgsConfig } = require('graphql/type/definition');
const Proyectos = require('../model/proyecto.model');
const Usuarios = require('../model/usuario.model');
const Obs = require ('../model/obs.model');
var mongoose = require('mongoose');
const { UniqueTypeNamesRule } = require('graphql');
//const bson = require('bson');

//HU_006
const obtenerProyectos = async () => {
    return await Proyectos.find({}).populate("lider")
        .populate("estudiantesInscritos.estudiante")
        .populate("estudiantesInscritos.proyecto", "nombreProyecto")
}

//HU_015
const obtenerMisSolicitudes = async (id) => {
    const lider = await Usuarios.findOne({id})
    return await Proyectos.find({'estudiantesInscritos.estado': "Inactivo", 'lider' : lider._id })
        .populate("lider")
        .populate("estudiantesInscritos.estudiante")
        .populate("estudiantesInscritos.proyecto", "nombreProyecto")
}


//HU_016
const inscribirEstudiante = async (id, idMiProyecto) => {
    const estudiante = await Usuarios.findOne({id})
    return Proyectos.updateOne({ 'estudiantesInscritos.estudiante': estudiante._id, 'idProyecto':idMiProyecto }, { $set:{'estudiantesInscritos.$.estado': 'Activo'}})
                .then(u => "Estudiante incrito en el proyecto seleccionado")
                .catch(err => "Fallo la inscripción");
}


//HU_017
const obtenerMisProyectos = async (id) => {
    const lider = await Usuarios.findOne({id})
    return await Proyectos.find({'lider' : lider._id })
        .populate("lider")
        .populate("estudiantesInscritos.estudiante")
        .populate("estudiantesInscritos.proyecto", "nombreProyecto")
        .populate("avances")
}

//HU_018
const agregarObservacion = async (idMiProyecto, idAvance, obs) => {
    return Proyectos.updateOne({'_id':idMiProyecto, 'avances._id': idAvance}, { $set:{'avances.$.observacion': obs}})
                .then(u => "Observación agregada exitosamente")
                .catch(err => "No se pudo agregar la observacion");
}


const obtenerProyecto = async (idProyecto) => {
    return await Proyectos.findOne({_id:idProyecto}).populate("lider")
        .populate("estudiantesInscritos.estudiante")
}

//HU_013
const obtenerProyectosLider = async (lider1) => {
    return await Proyectos.find({lider: lider1 })
}

//HU_007 y HU_008
const setEstadoProyecto = async (id, estado) => {
    console.log(`Se está modificando el proyecto con id: ${id}`);
    const proyecto = await Proyectos.findOne({_id:id});
    if (proyecto){
        if (proyecto.estado === "Inactivo" && proyecto.fase === "Nulo" && estado === "Activo") {
            // Aprobación del proyecto
            return Proyectos.updateOne({_id:id}, {$set:{estado, fase: "Iniciado", fechaInicio: new Date()}})
                .then(res => `Proyecto aprobado e iniciado`)
                .catch(err => `Falló el cambio de estado: ${err}`)
        } else if (proyecto.estado === "Inactivo" && proyecto.fase !== "Terminado" && estado === "Activo") {
            // Reactivar proyecto
            return Proyectos.updateOne({_id:id}, {estado})
                .then(res => `Proyecto reactivado`)
                .catch(err => `Falló el cambio de estado: ${err}`)
        } else if (proyecto.estado === "Activo" && estado === "Inactivo"){
            if(proyecto.fase === "Iniciado" || proyecto.fase === "EnDesarrollo"){
                // Inactivación de proyecto
                return Proyectos.updateOne({_id: id}, {$set:{estado: estado, 'estudiantesInscritos.$[obj].fechaEgreso': new Date()}},{multi: true, arrayFilters:[{'obj.fechaEgreso':{$exists: false}, 'obj.estado': 'Activo'}]})
                    .then(res => `Proyecto desactivado`)
                    .catch(err => `Falló el cambio de estado: ${err}`)
            } else {
                return "No se puede desactivar el proyecto"
            }
        } else {
            return "Falló cambio de estado del proyecto"
        }
        
    } else {
        return "Proyecto no válido"
    }
}

//HU_009
const setFaseProyecto = async (id, fase) => {
    console.log(`Se está modificando el proyecto con id: ${id}`);
    const proyecto = await Proyectos.findOne({_id:id});
    if ( proyecto ) {
        if (proyecto.estado === "Activo" && proyecto.fase === "EnDesarrollo" && fase === "Terminado") {
            // Proyecto terminado
            return Proyectos.updateOne({_id:id}, {$set:{fase, estado:"Inactivo", fechaTermina: new Date()}})
                .then(res => `Proyecto terminado`)
                .catch(err => `Falló el cambio de fase: ${err}`)
        }
    } else {
        return "Proyecto no válido"
    }
}

//HU_012
const SetCrearProyecto = (project) => {
    const nuevoProyecto = new Proyectos(project);
    return nuevoProyecto.save()
        .then(u => "Proyecto creado")
        .catch(err => console.log(err));
}

//HU_014
const SetModificarProyecto = async (lider1, idProyecto, nombreProyecto1, objGeneral1, objEspecifico1, presupuesto1) => {
    const proyecto = await Proyectos.find({lider: lider1 });
    if ( proyecto ) {
        const proyecto2 = await Proyectos.findOne({idProyecto});
        if (proyecto2.estado === "Activo") {
            return Proyectos.updateOne({idProyecto}, {$set:{nombreProyecto: nombreProyecto1, objGeneral: objGeneral1, objEspecifico: objEspecifico1, presupuesto: presupuesto1}})
                .then(res => `Proyecto actualizado`)
                .catch(err => `Falló la actualización: ${err}`)
        }
    } else {
        return res => "Proyecto no válido para actualiación"
    }
}

//HU_0
const verAvances = async (idProyecto, estudiante) => {
   
    let comprobarProyecto = await Proyectos.find({ _id: idProyecto }).then(function (res) {
        
        if (typeof res[0].estudiantesInscritos.length !== 0) {
            for (let i = 0; i < res[0].estudiantesInscritos.length; i++) {
                if (res[0].estudiantesInscritos[i].estudiante === estudiante) {
                    if (res[0].estudiantesInscritos[i].estado === "Activo") {
                        return true;
                    }

                }
            }
        }
    })
    if (comprobarProyecto) {
    return Proyectos.find({
        'estudiantesInscritos.estudiante': {
            $in: [
                mongoose.Types.ObjectId(estudiante),

            ]
        },

    }).then(function (res) {
        return res.map(function (x) {
            if (x._id == idProyecto) {
                console.log(x.avances)
                return x.avances.toString();
            }
        })
    })
    }else{
        return ["no registra avances asegurece de que esta inscrito y en estado activo "]
    }
}

//HU_
const RegistrarAvances = async (idProyecto, fechaAvance, descripcion, idUsuario) => {
    let comprobarProyecto = await Proyectos.find({ _id: idProyecto }).then(function (res) {
        console.log(res[0].estudiantesInscritos);
        if (res[0].estado === "Activo" && res[0].fase !== "Terminado" && typeof res[0].estudiantesInscritos.length !== 0) {
            for (let i = 0; i < res[0].estudiantesInscritos.length; i++) {
                if (res[0].estudiantesInscritos[i].estudiante === idUsuario) {
                    if (res[0].estudiantesInscritos[i].estado === "Activo") {
                        return true;
                    }

                }
            }
        }
    })
    if (comprobarProyecto) {
        let estainscrito = [false];
        var nickname = null;
        estainscrito = await Proyectos.find({ _id: idProyecto }, { "estudiantesInscritos.estudiante": idUsuario }).then(function (res) {

            return res.map(function (x) {
                if (typeof x.estudiantesInscritos[0] == "undefined") {
                    return false
                } else {
                    nickname = x.estudiantesInscritos.reduce(function (value, nickname) {

                        return nickname.estudiante === idUsuario ? nickname : null;
                    }, null);

                    if (nickname == null) {
                        return false
                    }
                    if (nickname !== null) {
                        return true
                    }
                }
            }) })

        
        if (nickname !== null) {
            return Proyectos.findOneAndUpdate(
                { _id: idProyecto },
                {
                    $push: {
                        avances:
                        {
                            idProyecto: idProyecto,
                            fechaAvance: fechaAvance,
                            descripcion: descripcion
                        }
                    }
                }).then(res => "se registro avance correctamente")
                .catch(err => "Falló al registrar avance")
        } else {
            return "no esta inscrito"
        }
    } else {
        return "proyecto en estado inactivo o terminado o ustes no esta inscrito"
    }
}

const ModificarAvances = async (idProyecto, idAvance, descripcion, idUsuario) => {
    let comprobarProyecto = await Proyectos.find({ _id: idProyecto }).then(function (res) {
        console.log(res[0].estudiantesInscritos);
        if (res[0].estado === "Activo" && res[0].fase !== "Terminado" && typeof res[0].estudiantesInscritos.length !== 0) {
            for (let i = 0; i < res[0].estudiantesInscritos.length; i++) {
                if (res[0].estudiantesInscritos[i].estudiante === idUsuario) {
                    if (res[0].estudiantesInscritos[i].estado === "Activo") {
                        return true;
                   }
                }
        } }})
    if (comprobarProyecto) {
        let estainscrito = [false];
        var nickname = null;
        estainscrito = await Proyectos.find({ _id: idProyecto }, { "estudiantesInscritos.estudiante": idUsuario }).then(function (res) {
            return res.map(function (x) {
                if (typeof x.estudiantesInscritos[0] == "undefined") {
                    return false
                } else {
                    nickname = x.estudiantesInscritos.reduce(function (value, nickname) {

                        return nickname.estudiante === idUsuario ? nickname : null;
                    }, null);

                    if (nickname == null) {
                        return false
                    }
                    if (nickname !== null) {
                        return true
                    }
                }
            }
            )
        })
        if (nickname !== null) {
            return Proyectos.updateOne(
                { _id: idProyecto, "avances._id": idAvance },
                {
                    $set: {
                        "avances.$.descripcion": descripcion

                    }
                }).then(res => "se modifico el avance correctamente")
                .catch(err => "Falló al modificar avance")
        } else {
            return "no esta inscrito"
        }
    } else {
        return "proyecto en estado inactivo o terminado o no esta inscrito"
    }
}

const InscribirmeProyecto = async (idProyecto, idUsuario, estado, fechaIngreso, fechaEgreso) => {
    let comprobarProyecto = await Proyectos.find({ _id: idProyecto }).then(function (res) {
        if (res[0].estado === "Activo" && res[0].fase !== "Terminado") {
            return true;
        }
    })
    if (comprobarProyecto) {
        let estainscrito = [false];
        var nickname = null;
        estainscrito = await Proyectos.find({ _id: idProyecto }, { "estudiantesInscritos.estudiante": idUsuario }).then(function (res) {
            return res.map(function (x) {

                if (typeof x.estudiantesInscritos[0] == "undefined") {
                    return false
                } else {
                    nickname = x.estudiantesInscritos.reduce(function (value, nickname) {
                        return nickname.estudiante === idUsuario ? nickname : null;
                    }, null);
                    if (nickname == null) {
                        return false
                    }
                    if (nickname !== null) {
                        return true
                    }
                }
            }
            )
        })
        if (nickname === null) {
            return Proyectos.findOneAndUpdate(
                { _id: idProyecto },
                {
                    $push: {
                        estudiantesInscritos:
                        {
                            estudiante: idUsuario,
                            proyecto: idProyecto,
                            estado: estado,
                            fechaIngreso: fechaIngreso,
                            fechaEgreso: fechaEgreso
                        }
                    }
                }).then(res => "se inscribio correctamente")
                .catch(err => "Falló al inscribirse")
        } else {
            return "ya se encuentra inscrito a este proyecto"
        }
    } else {
        return "proyecto en estado inactivo o terminado"
    }
}

module.exports = {
    obtenerProyectos,
    obtenerProyecto,
    setEstadoProyecto,
    setFaseProyecto,
    SetCrearProyecto,
    obtenerProyectosLider,
    SetModificarProyecto,
    obtenerMisSolicitudes,
    obtenerMisProyectos,
    inscribirEstudiante,
    agregarObservacion,
    verAvances,
    RegistrarAvances,
    ModificarAvances,
    InscribirmeProyecto
}