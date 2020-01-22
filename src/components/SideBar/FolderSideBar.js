import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SideBar from 'components/SideBar/SideBar';
import SideBarHeader from 'components/SideBar/SideBarHeader';
import BigButton from 'components/common/BigButton';

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
  return (
    <SideBar>
      <SideBarHeader>Folders</SideBarHeader>
      <FolderList>
        {props.folders.map((f, i) => {
          let folderClass = '';
          if (props.activeFolder && props.activeFolder.id === f.id)
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
    </SideBar>
  );
};
