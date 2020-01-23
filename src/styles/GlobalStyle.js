import { createGlobalStyle } from 'styled-components';

// global app styles
export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${props => props.theme.color.background};
    font-family: ${props => props.theme.font.main};
    color: ${props => props.theme.color.onBackground};
  }
  a {
    color: ${props => props.theme.color.link};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;
