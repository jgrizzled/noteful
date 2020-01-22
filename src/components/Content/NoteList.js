import React from 'react';
import styled from 'styled-components';
import ContentSection from 'components/Content/ContentSection';
import NoteCard from 'components/Content/NoteCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default props => (
  <ContentSection>
    <Container>
      {props.notes.map((n, i) => (
        <NoteCard note={n} key={i} />
      ))}
    </Container>
  </ContentSection>
);
