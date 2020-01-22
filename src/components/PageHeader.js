import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ThemeToggler from 'components/ThemeToggler';

const Container = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  background-color: ${props => props.theme.color.primary};
  color: ${props => props.theme.color.onPrimary};
  h1 {
    padding: 0;
    margin: 0;
  }

  .header,
  .header:hover {
    text-decoration: none;
    color: ${props => props.theme.color.onPrimary};
  }
`;

export default props => (
  <Container>
    <h1>
      <Link to="/" className="header">
        Noteful
      </Link>
    </h1>
    <ThemeToggler
      toggleTheme={props.toggleTheme}
      isDarkTheme={props.isDarkTheme}
    />
  </Container>
);
