import React from 'react';
import {
  ForecastStyledWrp,
  ForecastStyledTitle,
  ForecastStyledContentWrp,
  ForecastStyledImage,
  ForecastStyledTemp,
  ForecastStyledLocation,
  ForecastStyledSup,
} from './AsideForecastCard.styled';
import { weatherIcon } from '../../../images/images';
import { getDayOfWeek } from '../../../helpers/getDayOfWeek';
import { trimStringForCards } from '../../../helpers/trimStringForCards';
import { WeatherDay } from '@/api/weatherApi';

interface Forecast {
  days: WeatherDay[];
  address: string;
}

interface AsideForecastCardProps {
  forecast: Forecast;
}

export const AsideForecastCard: React.FC<AsideForecastCardProps> = ({
  forecast,
}) => {
  const { days, address } = forecast;
  const dayForecastData = days[0];
  const { temp, icon, datetime, description } = dayForecastData;

  return (
    <ForecastStyledWrp>
      <ForecastStyledTitle>{getDayOfWeek(datetime)}</ForecastStyledTitle>
      <ForecastStyledContentWrp>
        <ForecastStyledImage
          src={weatherIcon[icon]}
          alt={description}
          loading="lazy"
          width="120"
        />
        <ForecastStyledTemp>{Math.round(+temp)}</ForecastStyledTemp>
        <ForecastStyledSup>&deg;C</ForecastStyledSup>
      </ForecastStyledContentWrp>
      <ForecastStyledLocation>
        {trimStringForCards(address, ', Ukraine')}
      </ForecastStyledLocation>
    </ForecastStyledWrp>
  );
};
