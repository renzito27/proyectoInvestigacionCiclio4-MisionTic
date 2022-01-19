import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Detalles from './Detalles';
import Acciones from './Acciones';

const Row = (props )=> {
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
        <TableCell align="right">{row.nombreProyecto}</TableCell>
        <TableCell align="right">{row.estado}</TableCell>
        <TableCell align="right">{row.fase}</TableCell>
        <TableCell align="right">{row.fechaInicio}</TableCell>
        <TableCell align="right">{row.fechaTermina}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <center>
                <h5>Detalles</h5>
                </center>
              <ul className="list-grout list-group-flush">
                <li className="list-group-item">
                  <b>Nombre Proyecto:</b> {row.nombreProyecto}
                </li>
                <li className="list-group-item">
                  <b>Objetivo General:</b> {row.objGeneral}
                </li>
                <li className="list-group-item">
                  <b>Objetivos Especificos:</b> {row.objEspecifico}
                </li>
                <li className="list-group-item">
                  <b>Presupuesto:</b> {row.presupuesto}
                </li>
                <li className="list-group-item">
                  <b>Lider:</b> {row.lider?.nombre}
                  <br />
                  <b>ID:</b> {row.lider?.id}
                </li>
                <li className="list-group-item">
                  <b>Estudiantes Inscritos:</b>
                </li>
                <Detalles row={row} />
              
                  </ul>
              <center>
                <h5>Actualizar</h5>

        <Acciones id={row.id} estadoActual={row.estado} faseActual={row.fase} />

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
      id: PropTypes.string.isRequired,
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
