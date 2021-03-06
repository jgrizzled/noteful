// form to add new note

import React, { useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import NotesContext from 'contexts/NotesContext';
import NoteForm from 'components/forms/NoteForm';
import ErrorMessage from 'components/common/ErrorMessage';

export default function AddNote() {
  const params = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const { folders, addNote } = useContext(NotesContext);
  if (folders.length === 0)
    return <ErrorMessage>Please create a folder</ErrorMessage>;
  let folder_id = folders[0].id;
  if (params.folder_id) {
    const matchFolder = folders.find(f => f.id === Number(params.folder_id));
    if (matchFolder) folder_id = matchFolder.id;
  }

  const handleSubmit = async (e, title, folder_id, content) => {
    e.preventDefault();
    const formattedTitle = title.replace(/\s+/g, ' ').trim();
    const noSpacesTitle = formattedTitle.replace(/\s/g, '');
    if (noSpacesTitle.length === 0) {
      setError('Please enter a title');
      return;
    }
    folder_id = Number(folder_id);
    const note = { title: formattedTitle, folder_id, content };
    if (await addNote(note)) history.push(`/folder/${folder_id}`);
    else console.log('add note failed');
  };

  return (
    <NoteForm
      folder_id={folder_id}
      errorMessage={error}
      handleSubmit={handleSubmit}
    />
  );
}
