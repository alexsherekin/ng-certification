export enum WeatherCondition {
  sun = 'sun',
  clouds = 'clouds',
  rain = 'rain',
  snow = 'snow',
}

export interface WeatherConditions {
  date: Date;
  zipCode: string;
  place: string;
  current: WeatherCondition;
  temperature?: number;
  maxTemperature: number;
  minTemperature: number;
}
