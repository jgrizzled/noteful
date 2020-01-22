import styled from 'styled-components';

export default styled.nav`
  height: 100%;
  background-color: ${props => props.theme.color.primaryVariant};
  color: ${props => props.theme.color.onPrimary};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
