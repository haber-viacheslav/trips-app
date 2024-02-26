import React, { FC, ReactNode } from 'react';
import { StyledContainer } from './Container.styled';

export const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};
