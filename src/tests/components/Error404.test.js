import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import Error404 from 'components/Error404';

const error404 = <Error404 />;

// smoke test
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(error404, div);
  ReactDOM.unmountComponentAtNode(div);
});

// shallow snapshot test
it('renders as expected', () => {
  const tree = renderer.create(error404).toJSON();
  expect(tree).toMatchSnapshot();
});
