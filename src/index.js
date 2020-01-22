import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from 'styles/GlobalStyle';
import App from 'App';
import themes from 'styles/themes';
import { BrowserRouter } from 'react-router-dom';
import dummyStore from 'store/dummy-store';

ReactDOM.render(
  <>
    <GlobalStyle />
    <BrowserRouter>
      <App themes={themes} store={dummyStore} />
    </BrowserRouter>
  </>,
  document.getElementById('root')
);
