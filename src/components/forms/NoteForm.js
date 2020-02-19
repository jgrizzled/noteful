// form to edit note

import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import FolderSelector from 'components/forms/FolderSelector';
import ErrorMessage from 'components/common/ErrorMessage';

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const TitleInput = styled.input`
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

export default function NoteForm(props) {
  const [state, setState] = useState({
    title: props.title || '',
    folder_id: props.folder_id,
    content: props.content || ''
  });

  const onTitleChange = e => {
    const { value } = e.target;
    const alphanumericValue = value.replace(/[^0-9a-zA-Z \-_!?.]/g, '');
    setState(prevState => ({ ...prevState, title: alphanumericValue }));
  };

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <Form
      onSubmit={e =>
        props.handleSubmit(e, state.title, state.folder_id, state.content)
      }
    >
      {props.errorMessage && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
      <div>
        <label htmlFor='title'>Title:&nbsp;</label>
        <TitleInput
          name='title'
          id='title'
          value={state.title}
          onChange={onTitleChange}
          required
        />
      </div>
      <div>
        <label htmlFor='folder_id'>Folder:&nbsp;</label>
        <FolderSelector
          name='folder_id'
          id='folder_id'
          folder_id={state.folder_id}
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
        Submit
      </Button>
    </Form>
  );
}
