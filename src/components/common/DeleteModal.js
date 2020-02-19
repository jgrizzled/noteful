import React from 'react';
import styled from 'styled-components';
import DeleteButton from 'components/common/DeleteButton';
import Button from 'components/common/Button';

const ModalContainer = styled.div`
  position: fixed;
  background-color: rgba(255, 255, 255, 0.33);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  & > div {
    background-color: ${props => props.theme.color.surface};
    color: ${props => props.theme.color.onSurface};
    opacity: 1;
    width: 20rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    box-shadow: ${props => props.theme.boxShadow.normal};
  }
  h1 {
    font-size: 150%;
    margin: 0 0 15px;
  }
`;

const CloseButton = styled.button`
  color: inherit;
  line-height: 50px;
  font-size: 80%;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  font-weight: ${props => props.theme.fontWeight.bold};
  border: 0;
  background-color: inherit;
`;

const Text = styled.p`
  font-weight: ${props => props.theme.fontWeight.bold};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export default function DeleteModal(props) {
  return (
    <ModalContainer>
      <div>
        <CloseButton onClick={props.handleCancel}>X</CloseButton>
        <Text>{props.message}</Text>
        <ButtonContainer>
          <Button onClick={props.handleCancel}>Cancel</Button>
          <DeleteButton onClick={props.handleDelete}>Delete</DeleteButton>
        </ButtonContainer>
      </div>
    </ModalContainer>
  );
}
