import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
global.React = React;
import renderer from 'react-test-renderer';
global.renderer = renderer;
import ReactDOM from 'react-dom';
global.ReactDOM = ReactDOM;
import Enzyme from 'enzyme';
global.Enzyme = Enzyme;

global.notesContextValue = {
  notes: [
    {
      id: 0,
      title: 'test note',
      date_modified: '',
      content: '',
      folder_id: 0
    }
  ],
  folders: [
    {
      id: 0,
      name: 'test folder'
    }
  ],
  addNote: () => 1,
  deleteNote: () => true,
  modifyNote: () => true,
  addFolder: () => 1,
  deleteFolder: () => true,
  modifyFolder: () => true
};

configure({ adapter: new Adapter() });
