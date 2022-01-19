import {
    gql
  } from "@apollo/client"


export const GET_PROYECTOS = gql`
query obtenerProyectos {
        obtenerProyectos {
        id
        nombreProyecto
        estado
        fase
        fechaInicio
        fechaTermina
        objGeneral
        objEspecifico
        presupuesto
        lider {
          nombre
          id
        }
        estudiantesInscritos {
          estudiante {
            nombre
            id
          }
          estado
        }
      }
    }`

export const MUTATION_ESTADO = gql`
mutation($id: String!, $estado: String!){
setEstadoProyecto(id: $id, estado: $estado)
}
`;

export const MUTATION_FASE = gql`
  mutation($id: String!, $fase: String!) {
  setFaseProyecto(id: $id, fase: $fase)
}
`