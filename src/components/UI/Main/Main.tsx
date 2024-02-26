import React, { ReactNode, FC } from 'react';
import { StyledMain } from './Main.styled';
export const Main: FC<{ children: ReactNode }> = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};
