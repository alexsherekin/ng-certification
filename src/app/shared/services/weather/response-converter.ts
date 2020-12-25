import {WeatherConditions, WeatherCondition} from '../../structures/weather-conditions';

const toWeatherCondition = (response: any): WeatherCondition => {
  return response.weather.id !== 800 ? WeatherCondition.sun :
    response.rain !== undefined ? WeatherCondition.rain :
      response.snow !== undefined ? WeatherCondition.snow :
        WeatherCondition.clouds;
}

export const getByZipResponseConverter = (response: any, zipCode: string): WeatherConditions => {
  return {
    date: new Date(1000 * response.dt),
    zipCode,
    place: response.name,
    current: toWeatherCondition(response),
    temperature: response.main.temp,
    maxTemperature: response.main.temp_max,
    minTemperature: response.main.temp_min,
  };
};

export const getNByZipResponseConverter = (response: any, zipCode: string): WeatherConditions[] => {
  return response.list.map(item => {
    return {
      date: new Date(1000 * item.dt),
      zipCode,
      place: response.city.name,
      current: toWeatherCondition(item),
      maxTemperature: item.temp.max,
      minTemperature: item.temp.min,
    };
  });
};
