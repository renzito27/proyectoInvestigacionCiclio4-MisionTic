import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Acciones from './Acciones';

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.nombre}</TableCell>
        <TableCell align="right">{row.correo}</TableCell>
        <TableCell align="right">{row.tipo}</TableCell>
        <TableCell align="right">{row.estado}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <center>
                <h5>Actualizar</h5>

                <Acciones id={row.id} estadoActual={row.estado} />

              </center>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
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

export default Row