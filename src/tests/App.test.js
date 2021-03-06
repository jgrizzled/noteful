import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';
import themes from 'styles/themes';

const app = (
  <BrowserRouter>
    <App themes={themes} />
  </BrowserRouter>
);

// smoke test
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(app, div);
  ReactDOM.unmountComponentAtNode(div);
});

// shallow snapshot test
it('renders as expected', () => {
  const tree = renderer.create(app).toJSON();
  expect(tree).toMatchSnapshot();
});
