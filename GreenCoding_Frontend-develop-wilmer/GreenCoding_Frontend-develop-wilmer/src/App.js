import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Proyectos from './pages/Proyectos';
import Usuarios from './pages/Usuarios';

import Avances from './pages/Avances';
import Miperfil from './pages/MiPerfil';
import MisInscripciones from './pages/MisInscripciones';
import MisProyectos from './pages/MisProyectos';
//import ListaUsuarios from './pages/ListaUsuarios';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
        
          <Route exact path="/home" component={Home} />
          <Route exact path="/miperfil" component={Miperfil} />
          <Route exact path="/misproyectos" component={MisProyectos} />
          <Route exact path="/proyectos" component={Proyectos} />
          <Route exact path="/usuarios" component={Usuarios} />
          <Route exact path="/avances" component={Avances} />
          <Route exact path="/misisncripciones" component={MisInscripciones} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />

         
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
