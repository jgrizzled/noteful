import styled from 'styled-components';
import Color from 'color';
import Button from 'components/common/Button';

export default styled(Button)`
  border: 1px solid ${props => props.theme.color.error};
  color: ${props => props.theme.color.error};
  &:hover {
    border: 1px solid
      ${props =>
        Color(props.theme.color.error)
          .lighten(0.5)
          .hex()};
    color: ${props =>
      Color(props.theme.color.error)
        .lighten(0.5)
        .hex()};
  }
`;
