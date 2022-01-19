import React, { useContext} from 'react';
import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ObtenerUsuarioQuery } from '../util/graphql';
import '../../src/App.css'
import { useHistory } from "react-router-dom";
import { AuthContext } from '../context/auth';
function MiPerfil() {
    const history = useHistory();

    const { user } = useContext(AuthContext);
    if (user === null) {
        history.push("/login")

    }
    const val = {
        nombre: "",
        correo: "",
        clave: "",
        estado: "",
        tipo: ""
    }
 



    const obtenerUsuario = {}




    const obj = JSON.parse(JSON.stringify(user))
    let id = "";
    

    
    if (user) {
        obtenerUsuario._id = obj.id
        id = obtenerUsuario._id
    }

    const { loading, error, data } = useQuery(ObtenerUsuarioQuery, {
        variables: { id },
        skip: !obtenerUsuario?._id
    });
    if (data) {
        
        const {nombre,correo,clave,estado,tipo}=data.obtenerUsuario

        val.nombre=nombre;
        val.correo=correo;
        val.clave=clave;
        val.estado=estado;
        val.tipo=tipo;

    }

    return (
        <div>
            <div className="page-title">
                <h1>Perfil</h1>
            </div>
            <div>
                
                    <div>
                        <h1>{val.nombre}</h1>
                        <h1>{val.correo}</h1>
                        <h1>{val.clave}</h1>
                        <h1>{val.estado}</h1>
                        <h1>{val.tipo}</h1>
                    </div>
                
            </div>
        </div>);

}
export default MiPerfil;