import React, { useRef, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import {
  ForecastStyledListWrp,
  ForecastStyledList,
  ForecastStyledTitle,
} from './ForecastList.styled';
import { ForecastItem } from '../ForecastItem/ForecastItem';
import { convertNumOfDaysToString } from '../../../helpers/convertNumOfDaysToString';
import { WeatherResponse } from '@/api/weatherApi';

export type ForecastListProps = {
  forecastsData: Pick<WeatherResponse, 'days'>;
};

export const ForecastList: React.FC<ForecastListProps> = ({
  forecastsData,
}) => {
  const forecastsRef = useRef<HTMLUListElement>(null);
  const forecasts = [...forecastsData.days];
  if (forecasts.length > 0) {
    forecasts.map(forecastData => (forecastData.id = nanoid()));
  }
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (forecastsRef.current) {
      forecastsRef.current.scrollTo({
        left: forecastsRef.current.scrollLeft + e.deltaY * 2,
        behavior: 'smooth',
      });
    }
  }, []);
  useEffect(() => {
    const tripsList = forecastsRef.current;
    if (tripsList) {
      tripsList.addEventListener('wheel', handleWheel);
      return () => tripsList.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);
  return (
    <>
      {forecasts.length > 0 && (
        <>
          <ForecastStyledTitle>
            {convertNumOfDaysToString(forecasts.length)}
          </ForecastStyledTitle>
          <ForecastStyledListWrp>
            <ForecastStyledList ref={forecastsRef}>
              {forecasts.map(forecast => (
                <ForecastItem key={forecast.id} forecast={forecast} />
              ))}
            </ForecastStyledList>
          </ForecastStyledListWrp>
        </>
      )}
    </>
  );
};
