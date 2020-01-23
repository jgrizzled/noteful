import React, { useContext } from 'react';
import styled from 'styled-components';
import NotesContext from 'contexts/NotesContext';

const Select = styled.select`
  margin: 0.5rem auto;
  width: 15rem;
`;
export default props => {
  const { folders } = useContext(NotesContext);
  return (
    <Select
      value={props.folderId}
      name='folderId'
      onChange={e => props.onChange(e)}
    >
      {folders.map((f, i) => (
        <option value={f.id} key={i}>
          {f.name}
        </option>
      ))}
    </Select>
  );
};
