import React from 'react'
import PropTypes from 'prop-types'
import { GET_USUARIOS,  MUTATION_ESTADO } from '../../services/usuariosServicios'
import { useMutation } from '@apollo/client'
import { Button } from '@mui/material'

const Acciones = ({ id, estadoActual }) => {
    
    const [cambiarEstadoUsuario, { loading }] = useMutation(MUTATION_ESTADO, {
        refetchQueries: [
          GET_USUARIOS, // DocumentNode object parsed with gql
          'obtenerUsuarios' // Query name
        ],
      })
     
    return (
        <>
           <Button onClick={() => cambiarEstadoUsuario({
                  variables: {
                    setEstadoUsuarioId: id,
                    estado: "Autorizado"
                  }
                })}
                  disabled={(estadoActual === "Autorizado") ? true : false}
                >
                  Autorizar
                </Button>
                <Button onClick={() => cambiarEstadoUsuario({
                  variables: {
                    setEstadoUsuarioId: id,
                    estado: "NoAutorizado"
                  }
                })}
                  disabled={(estadoActual === "Pendiente" || estadoActual === "Autorizado") ? false : true}
                >
                  No Autorizar
                </Button> 
                {loading ? (<p>actualizando estado ...</p>) : ""}
             
        </>
    )
}

Acciones.propTypes = {
    id: PropTypes.string.isRequired,
    estadoActual: PropTypes.string.isRequired
}

export default Acciones
