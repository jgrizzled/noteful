import React, { useContext } from 'react';
import styled from 'styled-components';
import NoteCard from 'components/content/NoteCard';
import { useParams } from 'react-router-dom';
import NotesContext from 'contexts/NotesContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.p`
  line-height: 1.5rem;
  padding: 2rem;
  margin: 0;
`;

export default () => {
  const params = useParams();
  const { notes } = useContext(NotesContext);
  const note = notes.find(n => n.id === params.noteId);
  return (
    <Container>
      <NoteCard note={note} />
      <Text>{note.content}</Text>
    </Container>
  );
};
