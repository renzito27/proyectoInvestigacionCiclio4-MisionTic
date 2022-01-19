import React, {  useContext } from 'react';
import { useQuery } from '@apollo/client';
//import { Grid } from 'semantic-ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMutation } from '@apollo/client';
import '../../src/App.css'
import { InscribirmeProyectos } from '../util/graphql';
import { AuthContext } from '../context/auth';
import { ObtenerProyectosQuery } from '../util/graphql';
import { useHistory } from "react-router-dom";

let idProyecto = "";
let idUsuario = "";

function Home() {
  const history = useHistory();


  

  const { user } = useContext(AuthContext);
  if (user === null) {
    history.push("/login")

}
const [InscribirmeProyecto] = useMutation(InscribirmeProyectos)
const { loading, error, data } = useQuery(ObtenerProyectosQuery);


  const toggleModal = (id) => { 
    idProyecto = id;
    if (user) {
      const obj = JSON.parse(JSON.stringify(user))
      idUsuario = obj.id
    }
    if (idProyecto !== "" && idUsuario !== "") {
      InscribirmeProyecto(
        {
          update(
            _,
            {
              data:  userData 
            }
          ) {
            console.log(userData);              
          }, variables: {idProyecto,idUsuario}
        }
      ) 
    }   
  };

  // const obj=JSON.parse(JSON.stringify(user))
  return (
    <div>
    
      <div className="page-title">
        <h1>Proyectos</h1>
      </div>
      <div>
        {user && (
          <div>


          </div>
        )}
        {loading ? (
          <h1>cargando proyectos..</h1>
        ) : (
          <div id="dvb" class="container table-responsive py-5" style={{ "width": "100%", "max-width:": "480px", "overflow-x": "scroll" }}>

            <table id="tbl" class="table table-bordered table-hover">


              <thead id="thd" class="text-center table-success">
                <tr>

                  <th scope="col">Nombre del proyecto</th>
                  <th scope="col">Objetivo general</th>
                  <th scope="col">Onjetivo especifico</th>
                  <th scope="col">Presupuesto</th>
                  <th scope="col">fecha inicio</th>
                  <th scope="col">fecha fin</th>
                  <th scope="col">estado</th>
                  <th scope="col">fase</th>
                  <th scope="col">Operacion</th>
                </tr>
              </thead>



              <tbody class="text-center">

                {data &&
                  data.obtenerProyectos.map((post) => (
                    <tr key={post.id}>


                      <td>{post.nombreProyecto}</td>
                      <td>{post.objGeneral}</td>
                      <td>{post.objEspecifico}</td>
                      <td>{post.presupuesto}</td>
                      <td>{post.fechaInicio}</td>
                      <td>{post.fechaTermina}</td>
                      <td>{post.estado}</td>
                      <td>{post.fase}</td>
                      <td className='operation'>
                        <button className='button' onClick={() => toggleModal(post.id)}>Solicitar Inscripcion</button>
                      </td>
                    </tr>

                  ))}
              </tbody>

            </table>

          </div>

        )}
      </div>
    </div>
  );
}

export default Home;
//onClick={() => toggleModal(post.id)}