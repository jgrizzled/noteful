import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NoteCard from 'components/content/NoteCard';
import NotesContext from 'contexts/NotesContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default props => {
  const params = useParams();
  const { notes } = useContext(NotesContext);
  let renderNotes = notes;
  if (params.folderId)
    renderNotes = notes.filter(n => n.folderId === params.folderId);
  return (
    <Container>
      {renderNotes.map((n, i) => (
        <NoteCard note={n} key={i} />
      ))}
    </Container>
  );
};
