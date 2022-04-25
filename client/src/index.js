import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { ContextProvider } from './context/Context.js';

ReactDOM.render(
    <ContextProvider>
        <App />
    </ContextProvider>
    
    ,document.getElementById('root')
);