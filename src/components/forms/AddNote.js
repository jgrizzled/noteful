// form to add new note

import React, { useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import Button from 'components/common/Button';
import FolderSelector from 'components/forms/FolderSelector';
import NotesContext from 'contexts/NotesContext';
import ErrorMessage from 'components/common/ErrorMessage';

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const NameInput = styled.input`
  width: 15rem;
  margin: 0.5rem auto;
  padding: 0.25rem;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 80%;
  margin: 1rem auto;
  padding: 1rem;
  line-height: 1.5rem;
`;

const AddNote = () => {
  const params = useParams();
  const history = useHistory();
  const { folders, addNote } = useContext(NotesContext);
  let folderId = folders[0].id;
  if (params.folderId) {
    const matchFolder = folders.find(f => String(f.id) === params.folderId);
    if (matchFolder) folderId = matchFolder.id;
  }

  const [state, setState] = useState({
    name: '',
    folderId,
    content: '',
    errorMessage: null
  });

  const onNameChange = e => {
    const { value } = e.target;
    const alphanumericValue = value.replace(/[^0-9a-zA-Z \-_!?.]/g, '');
    setState(prevState => ({ ...prevState, name: alphanumericValue }));
  };

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, folderId, content } = state;
    const formattedName = name.replace(/\s+/g, ' ').trim();
    const noSpacesName = formattedName.replace(/\s/g, '');
    if (noSpacesName.length === 0) {
      setState(prevState => ({
        ...prevState,
        errorMessage: 'Please enter a name'
      }));
      return;
    }
    const modified = moment().toISOString();
    const note = { name: formattedName, folderId, content, modified };
    if (await addNote(note)) history.push(`/folder/${folderId}`);
    else console.log('add note failed');
  };

  return (
    <Form onSubmit={handleSubmit}>
      {state.errorMessage && <ErrorMessage>{state.errorMessage}</ErrorMessage>}
      <div>
        <label htmlFor='name'>Name:&nbsp;</label>
        <NameInput
          name='name'
          id='name'
          value={state.name}
          onChange={onNameChange}
          required
        />
      </div>
      <div>
        <label htmlFor='folderId'>Folder:&nbsp;</label>
        <FolderSelector
          name='folderId'
          id='folderId'
          folderId={state.folderId}
          onChange={onChange}
        />
      </div>
      <ContentInput
        value={state.content}
        name='content'
        placeholder='start typing...'
        onChange={onChange}
        required
      />
      <Button large type='submit'>
        Add Note
      </Button>
    </Form>
  );
};

export default AddNote;