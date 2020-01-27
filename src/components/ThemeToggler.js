// moon/sun icon to toggle dark theme

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Container = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.5rem;
`;

const ThemeToggler = props => (
  <Container onClick={props.toggleTheme}>
    {props.isDarkTheme ? (
      <FontAwesomeIcon icon={faSun} />
    ) : (
      <FontAwesomeIcon icon={faMoon} />
    )}
  </Container>
);

ThemeToggler.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  isDarkTheme: PropTypes.bool.isRequired
};

export default ThemeToggler;
