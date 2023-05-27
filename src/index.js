import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'


ReactDOM.render(
  <React.Fragment>
    {process.env.NODE_ENV !== 'production' ?(  <BrowserRouter>
      <App />
    </BrowserRouter> ): (  <HashRouter>
      <App />
    </HashRouter>)}
  </React.Fragment>,
  document.getElementById('root')
);

reportWebVitals();