// card with note title, date, and Delete button

import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from 'components/common/Button';
import NotesContext from 'contexts/NotesContext';
import DeleteButton from 'components/common/DeleteButton';

const Card = styled.div`
  position: relative;
  background-color: ${props => props.theme.color.surface};
  color: ${props => props.theme.color.onSurface};
  border-radius: 5px;
  box-shadow: ${props => props.theme.boxShadow.normal};
  width: 30rem;
  height: 10rem;
  margin: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 1.5rem;
  top: 0;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: ${props => props.theme.boxShadow.normalHover};
  }
  h2 {
    margin: 0;
  }
  p {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
  }
`;

const NoteCard = props => {
  const history = useHistory();
  const { deleteNote } = useContext(NotesContext);
  const params = useParams();
  const handleDelete = e => {
    e.stopPropagation();
    e.preventDefault();
    deleteNote(props.note.id);
    if (params.note_id === props.note.id) history.push('/');
  };
  const handleEdit = e => {
    e.stopPropagation();
    e.preventDefault();
    history.push(`/editnote/${props.note.id}`);
  };

  return (
    <Card>
      <h2>{props.note.title}</h2>
      <p>
        Last modified on{' '}
        {moment(props.note.date_modified).format('Do MMM YYYY')}
        <Button onClick={e => handleEdit(e)}>Edit</Button>
        <DeleteButton onClick={e => handleDelete(e)}>Delete</DeleteButton>
      </p>
    </Card>
  );
};

NoteCard.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string.isRequired,
    folder_id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    date_modified: PropTypes.string.isRequired
  })
};

export default NoteCard;
