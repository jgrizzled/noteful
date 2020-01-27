// form to add new folder

import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'components/common/Button';
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

const AddFolder = () => {
  const history = useHistory();
  const { addFolder } = useContext(NotesContext);

  const [state, setState] = useState({
    name: '',
    errorMessage: null
  });

  const onNameChange = e => {
    const { value } = e.target;
    const alphanumericValue = value.replace(/[^0-9a-zA-Z \-_!?.]/g, '');
    setState(prevState => ({ ...prevState, name: alphanumericValue }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name } = state;
    const formattedName = name.replace(/\s+/g, ' ').trim();
    const noSpacesName = formattedName.replace(/\s/g, '');
    if (noSpacesName.length === 0) {
      setState(prevState => ({
        ...prevState,
        errorMessage: 'Please enter a name'
      }));
      return;
    }
    const folder = { name: formattedName };
    const id = await addFolder(folder);
    if (id) history.push(`/folder/${id}`);
    else console.log('add folder failed');
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
      <Button large type='submit'>
        Add Folder
      </Button>
    </Form>
  );
};

export default AddFolder;
