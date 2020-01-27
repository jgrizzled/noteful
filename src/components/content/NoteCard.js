// card with note name, date, and Delete button

import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import DeleteButton from 'components/content/DeleteButton';
import NotesContext from 'contexts/NotesContext';

const Card = styled.section`
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
  const handleClick = (e, noteId) => {
    e.stopPropagation();
    deleteNote(noteId);
    if (params.noteId === String(noteId)) history.push('/');
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

NoteCard.propTypes = {
  note: PropTypes.shape({
    name: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    modified: PropTypes.string.isRequired
  })
};

export default NoteCard;
