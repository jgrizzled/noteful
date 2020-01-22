import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as moment from 'moment';
import SmallButton from 'components/common/SmallButton';

const Card = styled.div`
  background-color: ${props => props.theme.color.surface};
  color: ${props => props.theme.color.onSurface};
  border: 1px solid ${props => props.theme.color.onSurface};
  border-radius: 5px;
  width: 30rem;
  height: 10rem;
  margin: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 1.5rem;
  h2 {
    margin: 0;
  }
  p {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

export default props => {
  const history = useHistory();
  return (
    <Card onClick={() => history.push(`/note/${props.note.id}`)}>
      <h2>{props.note.name}</h2>
      <p>
        Last modified on {moment(props.note.modified).format('Do MMM YYYY')}
        <SmallButton>Delete</SmallButton>
      </p>
    </Card>
  );
};
