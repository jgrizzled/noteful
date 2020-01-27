// sidebar listing folders with Add Folder button

import React, { useContext } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder as faFolderSolid } from '@fortawesome/free-solid-svg-icons';
import { faFolder, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import Color from 'color';
import SidebarHeader from 'components/sidebar/SidebarHeader';
import Button from 'components/common/Button';
import NotesContext from 'contexts/NotesContext';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
`;

const FolderList = styled.ul`
  background-color: ${props =>
    Color(props.theme.color.surface)
      .blacken(0.15)
      .hex()};
  width: 100%;
  max-height: calc(100vh - 13rem);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  li {
    padding-left: 2rem;
    margin: 0.5rem;
    width: 100%;
    text-align: left;
  }
  a {
    color: ${props => props.theme.color.onSurface};
    display: flex;
  }
  b {
    display: flex;
  }
`;

const FolderSidebar = () => {
  const params = useParams();
  const history = useHistory();
  const { folders } = useContext(NotesContext);
  return (
    <Container>
      <SidebarHeader>
        <FontAwesomeIcon icon={faFolderSolid} />
        &nbsp;Folders
      </SidebarHeader>
      <FolderList>
        {folders.map((f, i) => {
          return (
            <li key={i}>
              {params.folderId && params.folderId === String(f.id) ? (
                <b>
                  <FontAwesomeIcon icon={faFolderOpen} />
                  &nbsp;{f.name}
                </b>
              ) : (
                <Link to={`/folder/${f.id}`}>
                  <FontAwesomeIcon icon={faFolder} /> &nbsp;{f.name}
                </Link>
              )}
            </li>
          );
        })}
      </FolderList>
      <Button large onClick={() => history.push('/addfolder')}>
        Add Folder
      </Button>
    </Container>
  );
};

export default FolderSidebar;
