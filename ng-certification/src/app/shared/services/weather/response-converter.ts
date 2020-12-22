import {WeatherConditions, WeatherCondition} from '../../structures/weather-conditions';

export const responseConverter = (response: any, zipCode: string): WeatherConditions => {
  const currentConditions: WeatherCondition =
    response.clouds !== undefined ? WeatherCondition.clouds :
      WeatherCondition.sun;
  return {
    zipCode,
    place: response.name,
    current: currentConditions,
    temperature: response.main.temp,
    maxTemperature: response.main.temp_max,
    minTemperature: response.main.temp_min,
  };
};
