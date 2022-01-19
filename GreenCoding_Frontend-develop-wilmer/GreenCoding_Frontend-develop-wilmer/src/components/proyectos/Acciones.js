import React from 'react'
import PropTypes from 'prop-types'
import { GET_PROYECTOS, MUTATION_FASE, MUTATION_ESTADO } from '../../services/proyectosServicios'
import { useMutation } from '@apollo/client'
import { Button } from '@mui/material'

const Acciones = ({ id, estadoActual, faseActual}) => {
    
    const [cambiarEstadoProyecto, { loading: loadingEstado }] = useMutation(MUTATION_ESTADO, {
        refetchQueries: [
          GET_PROYECTOS, // DocumentNode object parsed with gql
          'obtenerProyectos' // Query name
        ],
      })
    
      const [terminarProyecto, { loading: loadingFase }] = useMutation(MUTATION_FASE, {
        refetchQueries: [
          GET_PROYECTOS, // DocumentNode object parsed with gql
          'obtenerProyectos' // Query name
        ],
      })

    return (
        <>
           <Button onClick={() => cambiarEstadoProyecto({
                  variables: {
                    id: id,
                    estado: "Activo"
                  }
                })}
                  disabled={(estadoActual === "Activo" || faseActual === "Terminado") ? true : false}
                >
                  Activar
                </Button>
                <Button onClick={() => cambiarEstadoProyecto({
                  variables: {
                    id: id,
                    estado: "Inactivo"
                  }
                })}
                  disabled={estadoActual === "Inactivo" ? true : false}
                >
                  Inactivar
                </Button>
                <Button onClick={() => terminarProyecto({
                  variables: {
                    id: id,
                    fase: "Terminado"
                  }
                })}
                  disabled={ faseActual !== "EnDesarrollo" ? true : false}
                >
                  Terminar
                </Button> 
                {loadingEstado ? (<p>actualizando estado ...</p>) : ""}
              {loadingFase ? (<p>actualizando fase ...</p>) : ""}
        </>
    )
}

Acciones.propTypes = {
    id: PropTypes.string.isRequired,
    estadoActual: PropTypes.string.isRequired,
    faseActual: PropTypes.string.isRequired
}

export default Acciones
