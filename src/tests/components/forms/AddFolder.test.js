import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import themes from 'styles/themes';
import AddFolder from 'components/forms/AddFolder';
import NotesContext from 'contexts/NotesContext';

const component = (
  <BrowserRouter>
    <NotesContext.Provider value={notesContextValue}>
      <ThemeProvider theme={themes.light}>
        <AddFolder />
      </ThemeProvider>
    </NotesContext.Provider>
  </BrowserRouter>
);

// smoke test
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(component, div);
  ReactDOM.unmountComponentAtNode(div);
});

// shallow snapshot test
it('renders as expected', () => {
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
