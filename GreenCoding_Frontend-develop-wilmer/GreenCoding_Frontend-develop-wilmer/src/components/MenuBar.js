import React, { useContext, useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

//import { ObtenerUsuarioQuery } from '../util/graphql';
//import { useQuery } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import { useHistory } from "react-router-dom";

function MenuBar() {
  const history = useHistory();
  const { user, logout } = useContext(AuthContext);
  if (user === null) {
    history.push("/login")

}
  const [value, setValue] = useState("");

  let val = ""


  useEffect(() => {
    
    setValue(val);

  }, [val]);
  if (user) {

    const obj = JSON.parse(JSON.stringify(user))
    val = obj.perfil

  }

  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);
  //activeItem === 'home'

  const menuBar = user && user.perfil === "Lider" ?

    (


      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item name={value}  />

        <Menu.Item name="Mi perfil" active as={Link} to="/miperfil" />
        <Menu.Item name="proyetos" active as={Link} to="/home" />

  

        <Menu.Item name="Usuarios" active as={Link} to="/usuarios" />
        <Menu.Item name="Proyectos Liderados" active as={Link} to="/misproyectos" />


        <Menu.Item name="Mis inscripciones" active as={Link} to="/misisncripciones" />
        <Menu.Item name="Avances" active as={Link} to="/avances" />



        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={logout} />
        </Menu.Menu>
      </Menu>



    ) : user && user.perfil === "Administrador" ? (
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item name={value} />

        <Menu.Item name="Mi perfil" active as={Link} to="/miperfil" />


        <Menu.Item name="administrar usuarios" active as={Link} to="/usuarios" />


        <Menu.Item name="administrar proyectos" active as={Link} to="/proyectos" />
        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={logout} />
        </Menu.Menu>



   
      </Menu>
    ) : user && user.perfil === "Estudiante" ? (
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item name={value} />

        <Menu.Item name="Mi perfil" active as={Link} to="/miperfil" />


        <Menu.Item name="proyectos" active as={Link} to="/home" />
        <Menu.Item name="Mis inscripciones" active as={Link} to="/misisncripciones" />


        <Menu.Item name="avances" active as={Link} to="/avances" />
        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={logout} />
        </Menu.Menu>

      </Menu>
    ) :user===null &&  (
      
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>

    );



  return menuBar;
}




export default MenuBar;
