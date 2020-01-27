import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NoteContent from 'components/content/NoteContent';
import NotesContext from 'contexts/NotesContext';

const notesContextValue = {
  notes: [
    {
      id: '0',
      name: 'test note',
      modified: '',
      content: '',
      folderId: '0'
    }
  ],
  folders: [
    {
      id: '0',
      name: 'test folder'
    }
  ],
  addNote: () => true,
  deleteNote: () => true,
  addFolder: () => true
};

const component = (
  <BrowserRouter>
    <NotesContext.Provider value={notesContextValue}>
      <NoteContent />
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
