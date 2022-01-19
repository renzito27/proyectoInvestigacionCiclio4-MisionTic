import React, { useContext, useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import jwtDecode from 'jwt-decode';
//import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import { gql } from '@apollo/client';



function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [getresponse, result] = useMutation(validateUser);
  const [token, setToken] = useState(null);
  const showToken = name => {
    getresponse({
      variables: {
        token: name
      }
    })
  }
  useEffect(() => {
    if (result.data) {
      setToken(result.data.ValidarToken)
    }
  }, [result])
  if (token && token.value === "Token válido") {
    const decodedToken = jwtDecode(token.token);
    if (decodedToken.estado === "Autorizado") {

      //console.log(token)

      context.login(token.token);
      props.history.push('/');
      window.location.reload();
    }
    if (decodedToken.estado !== "Autorizado") {
      

    }

  }
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    correo: '',
    clave: ''
  });
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _,
      { data: { login: userData } }
    ) { showToken(userData.value) },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });
  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label="correo"
          placeholder="correo.."
          name="correo"
          type="text"
          value={values.correo}
          error={errors.correo ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="clave"
          placeholder="Password.."
          name="clave"
          type="password"
          value={values.clave}
          error={errors.clave ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($correo: String, $clave: String) {
   
      login(correo: $correo, clave: $clave) {
        value
      
    }
  }
`;
const validateUser = gql`
mutation ValidarToken($token: String) {
  ValidarToken(token: $token) {
    value
    perfil
    estado
    token
    id
  }
}

`

export default Login;
