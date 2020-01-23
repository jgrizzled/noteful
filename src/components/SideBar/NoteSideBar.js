import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import BigButton from 'components/common/BigButton';
import SidebarHeader from 'components/sidebar/SidebarHeader';
import NotesContext from 'contexts/NotesContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default props => {
  const history = useHistory();
  const params = useParams();
  const { notes, folders } = useContext(NotesContext);
  const note = notes.find(n => n.id === params.noteId);
  const folder = folders.find(f => f.id === note.folderId);
  return (
    <Container>
      <SidebarHeader>{folder.name}</SidebarHeader>
      <BigButton onClick={() => history.goBack()}>Back</BigButton>
    </Container>
  );
};
