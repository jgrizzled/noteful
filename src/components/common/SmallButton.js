import styled from 'styled-components';

export default styled.button`
  width: 4rem;
  height: 2rem;
  border: 1px solid ${props => props.theme.color.onSecondary};
  background-color: ${props => props.theme.color.secondary};
  color: ${props => props.theme.color.onSecondary};
  border-radius: 5px;
`;
