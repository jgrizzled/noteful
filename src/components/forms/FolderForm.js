// form to edit folder

import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
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

export default function FolderForm(props) {
  const [state, setState] = useState({
    name: props.name || '',
    errorMessage: props.errorMessage || null
  });

  const onNameChange = e => {
    const { value } = e.target;
    const alphanumericValue = value.replace(/[^0-9a-zA-Z \-_!?.]/g, '');
    setState(prevState => ({ ...prevState, name: alphanumericValue }));
  };

  return (
    <Form onSubmit={e => props.handleSubmit(e, state.name)}>
      {props.errorMessage && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
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
        Submit
      </Button>
    </Form>
  );
}
