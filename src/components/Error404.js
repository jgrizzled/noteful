import React from 'react';
import styled from 'styled-components';

const Container = styled.p`
  color: ${props => props.theme.color.error};
  margin: 1rem auto;
  font-size: ${props => props.theme.fontSize.large};
  font-weight: ${props => props.theme.fontWeight.bold};
`;

export default () => <Container>Error: page not found</Container>;
