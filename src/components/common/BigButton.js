import styled from 'styled-components';

export default styled.button`
  width: 10rem;
  height: 3rem;
  border: 1px solid ${props => props.theme.color.onSecondary};
  background-color: ${props => props.theme.color.secondary};
  color: ${props => props.theme.color.onSecondary};
  border-radius: 5px;
  font-size: ${props => props.theme.fontSize.large};
`;
