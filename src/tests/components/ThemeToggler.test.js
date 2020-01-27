import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import ThemeToggler from 'components/ThemeToggler';

const themeToggler = (
  <ThemeToggler toggleTheme={() => null} isDarkTheme={false} />
);

// smoke test
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(themeToggler, div);
  ReactDOM.unmountComponentAtNode(div);
});

// shallow snapshot test
it('renders as expected', () => {
  const tree = renderer.create(themeToggler).toJSON();
  expect(tree).toMatchSnapshot();
});
