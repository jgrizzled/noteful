// fetch notes and folders from noteful-json-server
const url = 'http://localhost:9090';

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

const deleteNote = async noteId => {
  const options = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  };
  const deleteNoteResponse = await fetch(`${url}/notes/${noteId}`, options);
  if (!deleteNoteResponse.ok) throw new Error(deleteNoteResponse.statusText);
  return true;
};

export default { fetchData, deleteNote };
