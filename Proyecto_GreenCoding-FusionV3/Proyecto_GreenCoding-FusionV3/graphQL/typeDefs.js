const { gql } = require('apollo-server-express');

const typeDefs = gql`
    
    scalar Date

    enum EstadoUsuario {
        Autorizado
        NoAutorizado
        Pendiente
    }

    enum Estado {
        Activo
        Inactivo
    }

    enum TipoUsuario {
        Administrador
        Lider
        Estudiante
    }

    enum Fase {
        Iniciado
        EnDesarrollo
        Terminado
        Nulo
    }
    
    type Usuario {
        id: String
        nombre: String
        correo: String
        tipo: TipoUsuario!
        estado: EstadoUsuario!
    }


    type estudianteInscrito {
        id: ID!
        estudiante: Usuario
        proyecto: Proyecto
        estado: Estado
        fechaIngreso: Date
        fechaEgreso: Date
    }

    type avance {
        id: ID!
        idProyecto: Proyecto
        fechaAvance: Date
        descripcion: String
        observacion: String
    }
    type Proyecto {
        id: String!
        nombreProyecto: String!
        objGeneral: String
        objEspecifico: String
        presupuesto: Int
        fechaInicio: Date
        fechaTermina: Date
        lider: Usuario
        estado: Estado
        fase: Fase
        estudiantesInscritos: [estudianteInscrito]
        avances: [avance]
    }
    type response{
        value :String
    }
    type responsetoken{
        value :String
        perfil:String
        estado:String
        token:String
        id:ID!
    }
    type user {
        nombre: String
        correo: String
        clave: String
        estado:String
        tipo:String
    }

    type Query {
        
        obtenerUsuarios : [Usuario]
        obtenerUsuario(id :String): user
        obtenerProyectos: [Proyecto]
        obtenerProyecto(idProyecto: String!): Proyecto
        obtenerMisSolicitudes(id: String): [Proyecto]
        obtenerMisPostulaciones(id: String): [Proyecto]
        obtenerMisProyectos(id: String): [Proyecto]
        obtenerProyectosLider(lider: String!): [Proyecto]
        obtenerEstudiantes : [Usuario]

    }

    input CreacionProyecto {
        idProyecto: String
        nombreProyecto: String!
        objGeneral: String
        objEspecifico: String
        presupuesto: Int
        estado: String
        fase: String
        lider: String
    }


    input CreacionUsuario{
    nombre: String 
    clave: String
    tipo:String
    correo: String
    }

    type Mutation {
        ValidarToken(token:String):responsetoken
        login(correo: String,clave :String) : response
        setEstadoUsuario(
            id: String!
            estado: String!
        ): String 
        
        inscribirEstudiante (id: String, idMiProyecto: String): String
        agregarObservacion (idMiProyecto: String, idAvance: String, obs: String ) : String

        setEstadoProyecto( 
            id: String!
            estado: String! 
        ): String
        setFaseProyecto(
            id: String!
            fase: String!
        ): String
        SetCrearProyecto(
            project:CreacionProyecto
        ):String
        SetModificarProyecto(
            lider: ID
            idProyecto: String
            nombreProyecto: String
            objGeneral: String
            objEspecifico: String
            presupuesto: Int
        ):String

        verAvances(
            idProyecto: String!
            estudiante:String!

        ):[String]

        InscribirmeProyecto(
            idProyecto: String!,
            idUsuario: String!,
            estado: String,
            fechaIngreso: Date,
            fechaEgreso: Date
        ):String
        RegistrarAvances(
            idProyecto: ID,
            fechaAvance: Date,
            descripcion: String,
            idUsuario : String!
        ): String
        ModificarAvances(
            idProyecto:ID, 
            idAvance:String, 
            descripcion:String, 
            idUsuario:String

        ):String

        crearUsuario(usuario: CreacionUsuario): String

        SetModificarUsuario(
            id: String
            nombre: String
            correo: String
            clave: String
        ):String
    }
`
module.exports = typeDefs;