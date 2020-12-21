import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {WeatherConditions} from '../../../shared/structures/weather-conditions';
import {WeatherService} from './weather.service';

@Injectable({
  providedIn: 'root',
  useClass: WeatherService,
})
export abstract class WeatherServiceInterface {
  abstract getByZip(zipCode: string): Observable<WeatherConditions>;
}
