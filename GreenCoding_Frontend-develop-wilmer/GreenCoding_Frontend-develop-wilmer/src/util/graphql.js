import { gql} from '@apollo/client';


export const ObtenerProyectosQuery = gql`
  
    query obtenerProyectos {
      obtenerProyectos{
      id
      nombreProyecto
      objGeneral
      objEspecifico
      presupuesto
      fechaInicio
      fechaTermina
      estado
      fase
      }
    }

  

  
`;
export const ObtenerUsuarioQuery = gql`
  
    query ObtenerUsuario ($id: String) {
      obtenerUsuario(id: $id) {
      nombre
      correo
      clave
      estado
      tipo
  }
}

`;
export const ObtenerPostulacionesQuery=gql`
 query ObtenerMisPostulaciones($id: String) {
  obtenerMisPostulaciones(id: $id) {
  id
  nombreProyecto
  presupuesto
  lider {
    id
  }
  estado
  estudiantesInscritos {
    id
  }
  fase
  avances {
    id
  }
    
  }

}
`;
export const InscribirmeProyectos=gql`
mutation ($idProyecto: String!, $idUsuario: String!) {
  InscribirmeProyecto(idProyecto: $idProyecto, idUsuario: $idUsuario)
}

`;
export const Veravance=gql`
mutation ($idProyecto: String!, $estudiante: String!) {
  verAvances(idProyecto: $idProyecto, estudiante: $estudiante)
}
`;
