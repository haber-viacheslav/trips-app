import React from 'react';
import { BiPlus } from 'react-icons/bi';
import { StyledAddButton } from './AddButton.styled';

interface AddButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <StyledAddButton type="button" onClick={onClick}>
      <BiPlus />
      Add trip
    </StyledAddButton>
  );
};
