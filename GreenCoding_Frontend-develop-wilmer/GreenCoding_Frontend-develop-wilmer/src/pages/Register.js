import React, {useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { gql} from '@apollo/client';


import { useForm } from '../util/hooks';

function Register(props) {
  
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    nombre: '',
    clave: '',
    tipo: '',
    correo: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { crearUsuario: userData }
      }
    ) {
      console.log(userData);
      //context.login(userData);
      
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }


  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label="nombre"
          placeholder="nombre"
          name="nombre"
          type="text"
          value={values.nombre}
          error={errors.nombre ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="correo"
          placeholder="correo"
          name="correo"
          type="email"
          value={values.correo}
          error={errors.correo ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="clave"
          placeholder="clave"
          name="clave"
          type="password"
          value={values.clave}
          error={errors.clave ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="tipo"
          placeholder="tipo"
          name="tipo"
          type="text"      
          value={values.tipo}
          error={errors.tipo ? true : false}
          onChange={onChange}
        />


        <Button type="submit" primary>
          Register
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

const REGISTER_USER = gql`
mutation crearUsuario(
  $nombre: String!
  $clave: String!
  $tipo: String!
  $correo: String!

) {
  
  crearUsuario(
    
    usuario: {
     nombre: $nombre
     clave: $clave
     tipo: $tipo
     correo: $correo
    }
  ) 
}
`;

export default Register;
