// list of NoteCards in folder

import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import NoteCard from 'components/content/NoteCard';
import NotesContext from 'contexts/NotesContext';
import Button from 'components/common/Button';
import ErrorMessage from 'components/common/ErrorMessage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoteList = () => {
  const params = useParams();
  const history = useHistory();
  const { notes, folders } = useContext(NotesContext);
  let renderNotes = notes;
  let folderId = '';
  if (params.folderId) {
    const matchFolder = folders.find(f => String(f.id) === params.folderId);
    if (!matchFolder) return <ErrorMessage>Folder not found!</ErrorMessage>;
    renderNotes = notes.filter(n => String(n.folderId) === params.folderId);
    folderId = params.folderId;
  }
  return (
    <Container>
      <Button large onClick={() => history.push(`/addnote/${folderId}`)}>
        Add Note
      </Button>
      {renderNotes.map((n, i) => (
        <NoteCard note={n} key={i} />
      ))}
    </Container>
  );
};

export default NoteList;
