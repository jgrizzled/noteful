// list of NoteCards in folder

import React, { useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import NoteCard from 'components/content/NoteCard';
import NotesContext from 'contexts/NotesContext';
import Button from 'components/common/Button';
import ErrorMessage from 'components/common/ErrorMessage';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoteLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

const NoteList = () => {
  const params = useParams();
  const history = useHistory();
  const { notes, folders } = useContext(NotesContext);
  let renderNotes = notes;
  let folder_id = '';
  if (params.folder_id) {
    const matchFolder = folders.find(f => f.id === Number(params.folder_id));
    if (!matchFolder) return <ErrorMessage>Folder not found!</ErrorMessage>;
    renderNotes = notes.filter(n => n.folder_id === Number(params.folder_id));
    folder_id = params.folder_id;
  }
  return (
    <Container>
      <Button large onClick={() => history.push(`/addnote/${folder_id}`)}>
        Add Note
      </Button>
      {renderNotes.map((n, i) => (
        <NoteLink to={`/note/${n.id}`} key={i}>
          <NoteCard note={n} />
        </NoteLink>
      ))}
    </Container>
  );
};

export default NoteList;
