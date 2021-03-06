// shows note card and content

import React, { useContext } from 'react';
import styled from 'styled-components';
import NoteCard from 'components/content/NoteCard';
import { useParams } from 'react-router-dom';
import NotesContext from 'contexts/NotesContext';
import ErrorMessage from 'components/common/ErrorMessage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

const Text = styled.p`
  line-height: 1.5rem;
  padding: 2rem;
  margin: 0;
`;

const NoteContent = () => {
  const params = useParams();
  const { notes } = useContext(NotesContext);
  const note = notes.find(n => n.id === Number(params.note_id));
  if (!note) return <ErrorMessage>Note not found!</ErrorMessage>;
  const splitContent = note.content.split(/(?:\r\n|\r|\n)/g);
  return (
    <Container>
      <NoteCard note={note} />
      <Text>
        {splitContent.map(c => (
          <>
            {c}
            <br />
          </>
        ))}
      </Text>
    </Container>
  );
};

export default NoteContent;
