import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import { BrowserRouter } from 'react-router-dom';
// base css
import 'normalize.css';
import 'styles/fonts.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
