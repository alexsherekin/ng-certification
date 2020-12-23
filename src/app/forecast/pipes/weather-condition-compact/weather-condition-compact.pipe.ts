import { Pipe, PipeTransform } from '@angular/core';
import {WeatherConditions} from '../../../shared/structures/weather-conditions';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

@Pipe({
  name: 'weatherConditionCompact',
  pure: true,
})
export class WeatherConditionCompactPipe implements PipeTransform {
  transform(condition: WeatherConditions): unknown {
    const dayOfWeek: string = daysOfWeek[condition.date.getDay()] || '';
    return `${dayOfWeek}: ${condition.current} - High: ${condition.maxTemperature} - Low: ${condition.minTemperature}`;
  }
}
