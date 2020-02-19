// select box with folders

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NotesContext from 'contexts/NotesContext';

const Select = styled.select`
  margin: 0.5rem auto;
  width: 15rem;
`;
const FolderSelector = props => {
  const { folders } = useContext(NotesContext);
  return (
    <Select value={props.folder_id} name='folder_id' onChange={props.onChange}>
      {folders.map((f, i) => (
        <option value={f.id} key={i}>
          {f.name}
        </option>
      ))}
    </Select>
  );
};

FolderSelector.propTypes = {
  folder_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onChange: PropTypes.func.isRequired
};

export default FolderSelector;
