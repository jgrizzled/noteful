import React, { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FolderForm from 'components/forms/FolderForm';
import NotesContext from 'contexts/NotesContext';
import ErrorMessage from 'components/common/ErrorMessage';

export default function EditFolder() {
  const history = useHistory();
  let { folder_id } = useParams();
  const [error, setError] = useState(null);
  folder_id = Number(folder_id);
  const { folders, modifyFolder } = useContext(NotesContext);
  const folder = folders.find(f => f.id === folder_id);
  if (!folder) return <ErrorMessage>Folder not found</ErrorMessage>;

  const handleSubmit = async (e, name) => {
    e.preventDefault();
    const formattedName = name.replace(/\s+/g, ' ').trim();
    const noSpacesName = formattedName.replace(/\s/g, '');
    if (noSpacesName.length === 0) {
      setError('Please enter a name');
      return;
    }
    const folder = { id: folder_id, name: formattedName };
    const result = await modifyFolder(folder);
    if (result) history.push(`/folder/${folder_id}`);
    else console.log('edit folder failed');
  };
  return (
    <FolderForm
      name={folder.name}
      errorMessage={error}
      handleSubmit={handleSubmit}
    />
  );
}
