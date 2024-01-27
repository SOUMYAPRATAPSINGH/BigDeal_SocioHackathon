import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.jsx"
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min.js'
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from './userContext.jsx';
// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3000/'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  
 
  <React.StrictMode>
    <ChakraProvider>
    <BrowserRouter>
    <UserProvider>
    <App />
    </UserProvider>
    </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,

)
