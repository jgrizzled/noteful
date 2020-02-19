import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import themes from 'styles/themes';
import NoteList from 'components/content/NoteList';
import NotesContext from 'contexts/NotesContext';

const component = (
  <BrowserRouter>
    <NotesContext.Provider value={notesContextValue}>
      <ThemeProvider theme={themes.light}>
        <NoteList />
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
