// sidebar listing folders with Add Folder button

import React, { useContext, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolder as faFolderSolid,
  faTrashAlt,
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import { faFolder, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import Color from 'color';
import SidebarHeader from 'components/sidebar/SidebarHeader';
import Button from 'components/common/Button';
import NotesContext from 'contexts/NotesContext';
import DeleteModal from 'components/common/DeleteModal';

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

const IconButton = styled.button`
  border: 0;
  background: inherit;
  margin: 0;
  padding: 0;
  color: inherit;
`;

export default function FolderSidebar() {
  const params = useParams();
  const history = useHistory();
  const { folders, deleteFolder } = useContext(NotesContext);
  const [isModalVisible, setModalVisibility] = useState(false);
  const toggleDeleteModal = () => {
    setModalVisibility(!isModalVisible);
  };
  const handleDelete = id => {
    setModalVisibility(false);
    deleteFolder(id);
    history.push('/');
  };
  const editFolder = id => {
    history.push(`/editfolder/${id}`);
  };
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
              {params.folder_id && Number(params.folder_id) === f.id ? (
                <b>
                  <FontAwesomeIcon icon={faFolderOpen} />
                  &nbsp;{f.name}
                  &nbsp;&nbsp;
                  <IconButton onClick={toggleDeleteModal}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </IconButton>
                  &nbsp;&nbsp;
                  <IconButton onClick={() => editFolder(f.id)}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </IconButton>
                  {isModalVisible && (
                    <DeleteModal
                      message={`Are you sure you want to delete folder ${f.name} and its notes?`}
                      handleCancel={toggleDeleteModal}
                      handleDelete={() => handleDelete(f.id)}
                    />
                  )}
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
}
