import React from 'react';
import {
  ForecastStyledItem,
  ForecastDay,
  ForecastWrapImg,
  ForecastImg,
  ForecastTemperature,
} from './ForecastItem.styled';
import { weatherIcon } from '../../../images/images';
import type { WeatherIconKey } from '../../../images/images';
import { getDayOfWeek } from '../../../helpers/getDayOfWeek';

interface ForecastItemProps {
  forecast: {
    datetime: string;
    icon: WeatherIconKey;
    description: string;
    tempmax: number;
    tempmin: number;
  };
}

export const ForecastItem: React.FC<ForecastItemProps> = ({ forecast }) => {
  const { datetime, icon, description, tempmax, tempmin } = forecast;
  return (
    <ForecastStyledItem>
      <ForecastDay>{getDayOfWeek(datetime)}</ForecastDay>
      <ForecastWrapImg>
        <ForecastImg
          src={weatherIcon[icon]}
          alt={description}
          loading="lazy"
          width="80"
        />
      </ForecastWrapImg>
      <ForecastTemperature>
        {Math.round(tempmax)}&deg;/{Math.round(tempmin)}&deg;
      </ForecastTemperature>
    </ForecastStyledItem>
  );
};
