import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { AuthContextProvider } from './auth/AuthContext';

//Appolo client
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>

    <ApolloProvider client={client}>
      <AuthContextProvider>
          <App />    
      </AuthContextProvider>
    </ApolloProvider>

  </React.StrictMode>
);
reportWebVitals();
