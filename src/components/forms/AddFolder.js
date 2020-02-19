import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FolderForm from 'components/forms/FolderForm';
import NotesContext from 'contexts/NotesContext';

export default function AddFolder() {
  const history = useHistory();
  const { addFolder } = useContext(NotesContext);
  const [error, setError] = useState(null);
  const handleSubmit = async (e, name) => {
    e.preventDefault();
    const formattedName = name.replace(/\s+/g, ' ').trim();
    const noSpacesName = formattedName.replace(/\s/g, '');
    if (noSpacesName.length === 0) {
      setError('Please enter a name');
      return;
    }
    const folder = { name: formattedName };
    const id = await addFolder(folder);
    if (id) history.push(`/folder/${id}`);
    else console.log('add folder failed');
  };
  return <FolderForm errorMessage={error} handleSubmit={handleSubmit} />;
}
