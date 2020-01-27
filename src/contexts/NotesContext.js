import React from 'react';

export default React.createContext({
  notes: [],
  folders: [],
  addNote: () => null,
  deleteNote: () => null,
  addFolder: () => null
});
