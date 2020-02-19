import React from 'react';

export default React.createContext({
  notes: [],
  folders: [],
  addNote: () => null,
  deleteNote: () => null,
  modifyNote: () => null,
  addFolder: () => null,
  deleteFolder: () => null,
  modifyFolder: () => null
});
