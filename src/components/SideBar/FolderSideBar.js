import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SidebarHeader from 'components/sidebar/SidebarHeader';
import BigButton from 'components/common/BigButton';
import NotesContext from 'contexts/NotesContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FolderList = styled.ul`
  padding: 0;
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  li {
    border-top: 1px solid ${props => props.theme.color.onPrimary};
    padding: 0.5rem;
    width: 100%;
    text-align: center;
  }
  li:last-of-type {
    border-bottom: 1px solid ${props => props.theme.color.onPrimary};
  }
  .active {
    background-color: ${props => props.theme.color.primary};
  }
`;

export default props => {
  const history = useHistory();
  const params = useParams();
  const { folders } = useContext(NotesContext);
  return (
    <Container>
      <SidebarHeader>Folders</SidebarHeader>
      <FolderList>
        {folders.map((f, i) => {
          let folderClass = '';
          if (params.folderId && params.folderId === f.id)
            folderClass = 'active';
          return (
            <li
              className={folderClass}
              onClick={() => history.push(`/folder/${f.id}`)}
              key={i}
            >
              {f.name}
            </li>
          );
        })}
      </FolderList>
      <BigButton>Add Folder</BigButton>
    </Container>
  );
};
