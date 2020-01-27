import styled from 'styled-components';
import Color from 'color';

// normal and large buttons
export default styled.button`
  position: relative;
  width: ${props => (props.large ? '10rem' : '4rem')};
  height: ${props => (props.large ? '3rem' : '2rem')};
  border: 1px solid ${props => props.theme.color.primary};
  background-color: inherit;
  color: ${props => props.theme.color.primary};
  border-radius: 5px;
  font-size: ${props =>
    props.large ? props.theme.fontSize.large : props.theme.fontSize.normal};
  font-weight: ${props => props.theme.fontWeight.bold};
  letter-spacing: 0.5px;
  margin: ${props => (props.large ? '1em' : '0')};
  &:hover {
    top: -1px;
    border: 1px solid
      ${props =>
        Color(props.theme.color.primary)
          .lighten(0.5)
          .hex()};
    color: ${props =>
      Color(props.theme.color.primary)
        .lighten(0.5)
        .hex()};
  }
`;
