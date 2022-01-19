import React from 'react';
import App from './App';
import {ApolloClient,InMemoryCache,createHttpLink} from '@apollo/client';

import { ApolloProvider } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: 'http://proyectogreencoding.herokuapp.com/graphql'
});
//http://localhost:3020/graphql
//http://proyectogreencoding.herokuapp.com/graphql

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
