import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as moment from 'moment';
import DeleteButton from 'components/content/DeleteButton';
import NotesContext from 'contexts/NotesContext';

const Card = styled.section`
  background-color: ${props => props.theme.color.surface};
  color: ${props => props.theme.color.onSurface};
  border: 1px solid ${props => props.theme.color.onSurface};
  border-radius: 5px;
  width: 30rem;
  height: 10rem;
  margin: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 1.5rem;
  h2 {
    margin: 0;
  }
  p {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

export default props => {
  const history = useHistory();
  const { deleteNote } = useContext(NotesContext);
  const params = useParams();
  const handleClick = (e, noteId) => {
    e.stopPropagation();
    deleteNote(noteId);
    if (params.noteId === noteId) history.push('/');
  };
  return (
    <Card onClick={() => history.push(`/note/${props.note.id}`)}>
      <h2>{props.note.name}</h2>
      <p>
        Last modified on {moment(props.note.modified).format('Do MMM YYYY')}
        <DeleteButton onClick={e => handleClick(e, props.note.id)}>
          Delete
        </DeleteButton>
      </p>
    </Card>
  );
};
