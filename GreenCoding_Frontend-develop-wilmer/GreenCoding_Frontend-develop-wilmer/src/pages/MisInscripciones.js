import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ObtenerPostulacionesQuery } from '../util/graphql';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../context/auth';
import { Veravance } from '../util/graphql';
import '../../src/App.css'
let idProyecto = "";
let estudiante = "";
let proyecto = "";


function MisInscripciones() {

    const history = useHistory();

    const [Veravances] = useMutation(Veravance)
    const { user } = useContext(AuthContext);
    if (user === null) {
        history.push("/login")

    }
    const obj = JSON.parse(JSON.stringify(user))
    let id = "";

    const obtenerMisPostulaciones = {}
    if (user) {
        obtenerMisPostulaciones._id = obj.id
        id = obtenerMisPostulaciones._id
    }


    const { loading, error, data } = useQuery(ObtenerPostulacionesQuery, {
        variables: {

            id

        },
        skip: !obtenerMisPostulaciones?._id
    });
    console.log(data)



    const toggle = (id) => {

        idProyecto = id;
        if (user) {
            const obj = JSON.parse(JSON.stringify(user))
            estudiante = obj.id
        }
        if (idProyecto !== "" && estudiante !== "") {
            Veravances(
                {
                    update(
                        _,
                        {
                            data: userData
                        }
                    ) {
                        alert(userData.verAvances);
                    }, variables: { idProyecto, estudiante }
                }
            )
        }

    }
    const handleChange = e => {
        const { name, value } = e.target;
        proyecto = value;

    };


    return (
        <div>

            <div className="page-title">
                <h1>inscripciones</h1>
            </div>



            <div id="dvb" class="container table-responsive py-5" style={{ "width": "100%", "max-width:": "480px", "overflow-x": "scroll" }}>

                <table id="tbl" class="table table-bordered table-hover">


                    <thead id="thd" class="text-center table-success">
                        <tr>

                            <th scope="col">Nombre del proyecto</th>
                            <th scope="col">Presupuesto</th>
                            <th scope="col">Lider</th>
                            <th scope="col">Estado</th>
                            <th scope="col">estudiantesInscritos</th>
                            <th scope="col">fase</th>
                            <th scope="col">avances</th>

                            <th scope="col">Operacion 1</th>
                            <th scope="col">Operacion 2</th>
                        </tr>
                    </thead>


                    <tbody class="text-center">

                        {data &&
                            data.obtenerMisPostulaciones.map((post) => (
                                <tr key={post.id}>

                                    <td>{post.nombreProyecto}</td>
                                    <td>{post.presupuesto}</td>
                                    <td>{post.lider ? post.lider.id : "no tiene"}</td>
                                    <td>{post.estado}</td>
                                    <td>{post.estudiantesInscritos.length > 0 ? post.estudiantesInscritos.id : "no tiene"}</td>
                                    <td>{post.fase}</td>
                                    <td>{post.avances.length > 0 ? post.avances.id : "no tiene"}</td>



                                    <td className='operation'>
                                        <input onChange={handleChange} type="radio" name="abc"

                                            value={post.id} />
                                    </td>

                                    <td className='operation'>
                                        <button className='button' onClick={() => toggle(post.id)} >Ver Avances</button>
                                    </td>
                                </tr>

                            ))}
                    </tbody>



                </table>
            </div>
            {data && data.obtenerMisPostulaciones.length === 0 ? (
                <h3>no se ha postulado</h3>
            ) : (
                <form>
                    <h3>Seleccione un proyecto mediante el raddiobutton para registrar avances</h3>
                    <input type="text" placeholder="ingrese fecha"></input>
                    <input type="text" placeholder="ingrese descripcion"></input>
                    <button type="submit">Registrar Avances</button>
                </form>

            )

            }

        </div>);

}
export default MisInscripciones;