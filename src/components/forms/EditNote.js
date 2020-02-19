// form to add new note

import React, { useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import NotesContext from 'contexts/NotesContext';
import NoteForm from 'components/forms/NoteForm';
import ErrorMessage from 'components/common/ErrorMessage';

export default function EditNote() {
  const params = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const { notes, modifyNote } = useContext(NotesContext);
  const note = notes.find(n => n.id === Number(params.note_id));
  if (!note) return <ErrorMessage>Note not found</ErrorMessage>;

  const handleSubmit = async (e, title, folder_id, content) => {
    e.preventDefault();
    const formattedTitle = title.replace(/\s+/g, ' ').trim();
    const noSpacesTitle = formattedTitle.replace(/\s/g, '');
    if (noSpacesTitle.length === 0) {
      setError('Please enter a title');
      return;
    }
    const date_modified = moment().toISOString();
    folder_id = Number(folder_id);
    const modifiedNote = {
      id: note.id,
      title: formattedTitle,
      folder_id,
      content,
      date_modified
    };
    if (await modifyNote(modifiedNote)) history.push(`/note/${note.id}`);
    else console.log('modify note failed');
  };

  return (
    <NoteForm
      title={note.title}
      folder_id={note.folder_id}
      content={note.content}
      errorMessage={error}
      handleSubmit={handleSubmit}
    />
  );
}
