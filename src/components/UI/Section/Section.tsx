import React, { FC, ReactNode } from 'react';

import { StyledSection } from './Section.styled';
export const Section: FC<{ children: ReactNode }> = ({ children }) => {
  return <StyledSection>{children}</StyledSection>;
};
