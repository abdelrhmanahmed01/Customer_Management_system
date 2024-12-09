import React from 'react';
import ReactDOM from 'react-dom/client';  
import Customer from './Customer'; 
import CustomerList from './CustomerList';      

const root = ReactDOM.createRoot(document.querySelector("#root")); 
root.render(<CustomerList />);  