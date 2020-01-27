// render children only if loaded=true

import React from 'react';
import styled from 'styled-components';

const Container = styled.h1`
  text-align: center;
  margin: 1rem auto;
`;

const IfLoaded = props =>
  props.loaded ? <>{props.children}</> : <Container>Loading...</Container>;

export default IfLoaded;
