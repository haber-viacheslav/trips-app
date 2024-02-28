import React from 'react';
import { StyledCloseButton } from './CloseButton.styled';

interface CloseButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export const CloseButton: React.FC<CloseButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <StyledCloseButton type="button" onClick={onClick}>
      {children}
    </StyledCloseButton>
  );
};
