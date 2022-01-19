import {
    gql
  } from "@apollo/client"


export const GET_USUARIOS = gql`
query {
  obtenerUsuarios {
    id
    nombre
    correo
    tipo
    estado
  }
}`

export const MUTATION_ESTADO = gql`
mutation($setEstadoUsuarioId: String!, $estado: String!){
  setEstadoUsuario(id: $setEstadoUsuarioId, estado: $estado)
}
`;