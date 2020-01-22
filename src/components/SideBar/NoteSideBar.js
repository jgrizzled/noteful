import React from 'react';
import { useHistory } from 'react-router-dom';
import SideBar from 'components/SideBar/SideBar';
import BigButton from 'components/common/BigButton';
import SideBarHeader from 'components/SideBar/SideBarHeader';

export default props => {
  const history = useHistory();
  return (
    <SideBar>
      <SideBarHeader>{props.folder.name}</SideBarHeader>
      <BigButton onClick={() => history.goBack()}>Back</BigButton>
    </SideBar>
  );
};
