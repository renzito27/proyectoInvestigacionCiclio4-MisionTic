const { obtenerUsuarios, setEstadoUsuario, obtenerMisPostulaciones, obtenerEstudiantes,
crearUsuario, SetModificarUsuario,login,ValidarToken,obtenerUsuario} = require('../services/usuario.service');
const { obtenerProyectos,obtenerMisSolicitudes, obtenerMisProyectos, inscribirEstudiante, agregarObservacion, obtenerProyecto, setEstadoProyecto, setFaseProyecto,  SetCrearProyecto, obtenerProyectosLider, SetModificarProyecto
    ,InscribirmeProyecto,verAvances ,RegistrarAvances,ModificarAvances } = require('../services/proyecto.service');

const { GraphQLDateTime } = require('graphql-iso-date');


const customScalarResolver = {
  Date: GraphQLDateTime
};



const resolvers = {

    Date: customScalarResolver,

    Query: {
        obtenerUsuario: async (parent, args, context, info) => obtenerUsuario(args.id),
        obtenerUsuarios: async () => obtenerUsuarios(),
        obtenerProyectos: async () => obtenerProyectos(),
        obtenerMisSolicitudes: async (parent, args, context, info) => obtenerMisSolicitudes(args.id),
        obtenerMisPostulaciones: async (parent, args, context, info) => obtenerMisPostulaciones(args.id),
        obtenerMisProyectos: async (parent, args, context, info) => obtenerMisProyectos(args.id),
        obtenerProyecto: async (parent, args, context, info) => obtenerProyecto(args.idProyecto),
        obtenerProyectosLider: async (parent, args, context, info) => obtenerProyectosLider(args.lider),
        obtenerEstudiantes: async () => obtenerEstudiantes(),
        
        
    },

    Mutation: {
        verAvances: async (parent, args, context, info) => verAvances(args.idProyecto,args.estudiante),
        ValidarToken:async(parent, args, context, info)=>ValidarToken(args.token),
        login:async(parent, args, context, info)=>login(args.correo,args.clave),
        setEstadoUsuario: async(parent, args, context, info) => setEstadoUsuario(args.id, args.estado),
        inscribirEstudiante: async (parent, args, context, info) => inscribirEstudiante(args.id, args.idMiProyecto),
        agregarObservacion: async (parent, args, context, info) => agregarObservacion(args.idMiProyecto, args.idAvance, args.obs),
        setEstadoProyecto: async(parent, args, context, info) => setEstadoProyecto(args.id, args.estado),
        setFaseProyecto: async(parent, args, context, info) => setFaseProyecto(args.id, args.fase),
        SetCrearProyecto: async(parent, args, context, info) =>  SetCrearProyecto(args.project),
        SetModificarProyecto: async(parent, args, context, info) =>  SetModificarProyecto(args.lider, args.idProyecto, args.nombreProyecto, args.objGeneral, args.objEspecifico, args.presupuesto),
        ModificarAvances:async (parent, args, context, info)=>ModificarAvances(args.idProyecto, args.idAvance, args.descripcion, args.idUsuario),
        RegistrarAvances:async (parent, args, context, info)=>RegistrarAvances(args.idProyecto, args.fechaAvance, args.descripcion,args.idUsuario),
        InscribirmeProyecto: async (parent, args, context, info) => InscribirmeProyecto(args.idProyecto, args.idUsuario,args.estado,args.fechaIngreso,args.fechaEgreso),
        
        
        crearUsuario: (parent, args, context, info) => crearUsuario(args.usuario),
        SetModificarUsuario: (parent, args, context, info) => SetModificarUsuario(args.id, args.nombre, args.correo, args.clave)
        },
}

module.exports = resolvers;
