import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../context/auth';
import { useQuery } from "@apollo/client"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
// MIS FUNCIONES
import { GET_PROYECTOS } from "../services/proyectosServicios";
import Row from "../components/proyectos/Row";


const Proyectos = () => {
    const { user } = useContext(AuthContext);
    //const obj = JSON.parse(JSON.stringify(user))
    const history = useHistory();
    if (user === null) {
        history.push("/login")

    }

  const { loading,error, data } = useQuery(GET_PROYECTOS);
 



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.obtenerProyectos.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div class="container">
        
      <center>
        <h1>
          Proyectos
        </h1>
      </center>
      {loading ? (
        <h3>cargando proyectos...</h3>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell><b>ID</b></TableCell>
                <TableCell align="right"><b>Nombre</b></TableCell>
                <TableCell align="right"><b>Estado</b></TableCell>
                <TableCell align="right"><b>Fase</b></TableCell>
                <TableCell align="right"><b>Fecha de Inicio</b></TableCell>
                <TableCell align="right"><b>Fecha Finalizado</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data.obtenerProyectos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : data.obtenerProyectos
              ).map((row) => (
                <Row key={row.id} row={row} />
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  count={data.obtenerProyectos.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>)}
       

    </div>
  );
}
export default Proyectos;


            


