// noteful-json-server REST API handlers

import config from 'config';

const url = config.API_URL;

// fetches data and returns {notes: [], folders: []}
const fetchData = async () => {
  const [notesResponse, foldersResponse] = await Promise.all([
    fetch(url + '/notes'),
    fetch(url + '/folders')
  ]);
  if (!notesResponse.ok) throw new Error(notesResponse.statusText);
  if (!foldersResponse.ok) throw new Error(foldersResponse.statusText);
  const [notes, folders] = await Promise.all([
    notesResponse.json(),
    foldersResponse.json()
  ]);
  if (!Array.isArray(notes) || !Array.isArray(folders))
    throw new Error('Invalid data type response');
  return { notes, folders };
};

// deletes note from server, returns true on success
const deleteNote = async noteId => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await fetch(`${url}/notes/${noteId}`, options);
  if (!response.ok) throw new Error(response.statusText);
  return true;
};

// adds note to server, returns id on success
const addNote = async note => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  };
  const response = await fetch(`${url}/notes`, options);
  if (!response.ok) throw new Error(response.statusText);
  const { id } = await response.json();
  if (typeof id === 'string' || typeof id === 'number') return id;
  return null;
};

// adds folder to server, returns id on success
const addFolder = async folder => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(folder)
  };
  const response = await fetch(`${url}/folders`, options);
  if (!response.ok) throw new Error(response.statusText);
  const { id } = await response.json();
  if (typeof id === 'string' || typeof id === 'number') return id;
  return null;
};

export default { fetchData, deleteNote, addNote, addFolder };
