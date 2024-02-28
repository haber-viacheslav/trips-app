import axios, { AxiosResponse } from 'axios';
import { formatRequestDate } from '../helpers/formatRequestDate';
import { Trip } from '../App';
import type { WeatherIconKey } from '../images/images';

export interface WeatherDay {
  id?: string;
  datetime: string;
  datetimeEpoch?: number;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslikemax?: number;
  feelslikemin?: number;
  feelslike?: number;
  dew?: number;
  humidity?: number;
  precip?: number;
  precipprob?: number;
  precipcover?: number;
  preciptype?: string[] | null;
  snow?: number;
  snowdepth?: number;
  windgust?: number;
  windspeed?: number;
  winddir?: number;
  pressure?: number;
  cloudcover?: number;
  visibility?: null;
  solarradiation?: string;
  sunsetEpoch?: number;
  moonphase?: number;
  conditions?: string;
  description: string;
  icon: WeatherIconKey;
  stations?: string[];
  source?: string;
}

export interface WeatherResponse {
  queryCost?: number;
  latitude?: number;
  longitude?: number;
  resolvedAddress?: string;
  address: string;
  timezone?: string;
  tzoffset?: number;
  days: WeatherDay[];
}

export const API_KEY = 'ME7S843NF7P43LGDA959W8PLB';

axios.defaults.baseURL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

export const getWeatherByDates = async (
  trip: Trip
): Promise<WeatherResponse> => {
  const { name, startTime, endTime } = trip;
  try {
    const response: AxiosResponse<WeatherResponse> = await axios.get(
      `${name}/${formatRequestDate(startTime, 'toDashes')}/${formatRequestDate(
        endTime,
        'toDashes'
      )}?unitGroup=metric&include=days&iconSet=icons2&key=${API_KEY}&contentType=json`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data by dates');
  }
};

export const getWeatherByDay = async (trip: Trip): Promise<WeatherResponse> => {
  try {
    const response: AxiosResponse<WeatherResponse> = await axios.get(
      `${trip.name}/today?unitGroup=metric&include=days&iconSet=icons2&key=${API_KEY}&contentType=json`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data by day');
  }
};
