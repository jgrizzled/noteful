import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BigButton from 'components/common/BigButton';
import FolderSelector from 'components/forms/FolderSelector';
import NotesContext from 'contexts/NotesContext';

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

export default props => {
  const params = useParams();
  const { folders } = useContext(NotesContext);
  let folderId = folders[0].id;
  if (params.folderId) {
    const matchFolderId = folders.find(f => f.id === params.folderId);
    if (matchFolderId) folderId = matchFolderId;
  }
  const [state, setState] = useState({
    name: '',
    folderId,
    content: ''
  });

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    const note = { ...state };
    console.log(note);
  };

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <div>
        <label htmlFor='name'>Name:&nbsp;</label>
        <NameInput
          name='name'
          id='name'
          value={state.name}
          onChange={e => onChange(e)}
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
        onChange={e => onChange(e)}
      />
      <BigButton type='submit'>Add Note</BigButton>
    </Form>
  );
};
