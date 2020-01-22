import React from 'react';
import styled from 'styled-components';
import ContentSection from 'components/Content/ContentSection';
import NoteCard from 'components/Content/NoteCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.p`
  line-height: 1.5rem;
  padding: 2rem;
  margin: 0;
`;

export default props => (
  <ContentSection>
    <Container>
      <NoteCard note={props.note} />
      <Text>{props.note.content}</Text>
    </Container>
  </ContentSection>
);
