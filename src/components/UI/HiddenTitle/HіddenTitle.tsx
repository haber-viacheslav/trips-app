import React, { FC } from 'react';
import { HiddenStyledTitle } from './HіddenTitle.styled';

interface HiddenTitleProps {
  text: string;
}

export const HiddenTitle: FC<HiddenTitleProps> = ({ text }) => {
  return <HiddenStyledTitle>{text}</HiddenStyledTitle>;
};
