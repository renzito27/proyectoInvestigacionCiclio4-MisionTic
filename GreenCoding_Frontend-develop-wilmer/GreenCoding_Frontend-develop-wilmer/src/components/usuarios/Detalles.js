import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const Detalles = (props) => {
    const { row } = props;

    return (
        <Table size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                 
                        <TableCell><b>ID</b></TableCell>
                        <TableCell><b>Nombre</b></TableCell>
                        <TableCell><b>Estado</b></TableCell>
                       
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {row?.estudiantesInscritos.map((post) => (
                          <TableRow
                          key={row.idProyecto}
                          sx={{ '&:last-child TableCell, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{post.estudiante.id}</TableCell>
                            <TableCell>{post.estudiante.nombre}</TableCell>
                            <TableCell>{post.estado}</TableCell>
                          </TableRow>

                        ))}
                    </TableBody>
                  </Table>
    )
}

Detalles.propTypes = {
  row: PropTypes.shape({
    idProyecto: PropTypes.string.isRequired,
    nombreProyecto: PropTypes.string.isRequired,
    fase: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
    fechaInicio: PropTypes.string,
    objGeneral: PropTypes.string,
    objEspecifico: PropTypes.string,
    fechaTermina: PropTypes.string,
    lider: PropTypes.objectOf(
      PropTypes.shape({
        nombre: PropTypes.string,
        id: PropTypes.string,
      }),
    ),
    estudiantesInscritos: PropTypes.arrayOf(
      PropTypes.shape({
        estudiante: PropTypes.objectOf({
          nombre: PropTypes.string,
          id: PropTypes.string,
        }),
        estado: PropTypes.string,
      })),
  }).isRequired,
};

export default Detalles