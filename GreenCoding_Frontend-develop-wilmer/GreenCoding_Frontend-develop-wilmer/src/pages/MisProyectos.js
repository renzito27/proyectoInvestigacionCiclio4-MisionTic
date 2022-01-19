import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
//import { useQuery } from '@apollo/react-hooks';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../../src/App.css'

import { AuthContext } from '../context/auth';
function MisProyectos() {
    const { user } = useContext(AuthContext);
    const obj = JSON.parse(JSON.stringify(user))
    const history = useHistory();
    if (user === null) {
        history.push("/login")

    }
    return (
        <div>
            <div className="page-title">
                <h1>PROYECTOS QUE LIDERO</h1>
            </div>
            <div>
                {user && (
                    <div>
                        {obj.id}

                    </div>
                )}
            </div>
        </div>);

}
export default MisProyectos;