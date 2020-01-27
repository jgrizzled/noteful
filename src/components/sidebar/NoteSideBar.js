// sidebar showing note folder name and Back button

import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'components/common/Button';
import SidebarHeader from 'components/sidebar/SidebarHeader';
import NotesContext from 'contexts/NotesContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoteSidebar = () => {
  const history = useHistory();
  const params = useParams();
  const { notes, folders } = useContext(NotesContext);
  const note = notes.find(n => String(n.id) === params.noteId);
  let folderName = '';
  if (note) folderName = folders.find(f => String(f.id) === note.folderId).name;
  return (
    <Container>
      <SidebarHeader>{folderName}</SidebarHeader>
      <Button large onClick={() => history.goBack()}>
        Back
      </Button>
    </Container>
  );
};

export default NoteSidebar;
