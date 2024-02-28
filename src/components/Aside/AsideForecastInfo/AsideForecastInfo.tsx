import React, { ReactNode } from 'react';
import {
  AsideStyledForecastInfo,
  AsideStyledForecastWrp,
} from './AsideForecastInfo.styled';

interface AsideForecastInfoProps {
  children: ReactNode;
}

export const AsideForecastInfo: React.FC<AsideForecastInfoProps> = ({
  children,
}) => {
  return (
    <AsideStyledForecastInfo>
      <AsideStyledForecastWrp>{children}</AsideStyledForecastWrp>
    </AsideStyledForecastInfo>
  );
};
