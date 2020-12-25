import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {WeatherConditions} from '../../structures/weather-conditions';
import {CoreModule} from '../../../core/core.module';
import {WeatherService} from './weather.service';

@Injectable({
  providedIn: CoreModule,
  useClass: WeatherService,
})
export abstract class WeatherServiceInterface {
  abstract getByZip(zipCode: string): Observable<WeatherConditions>;
  abstract get5DaysByZip(zipCode: string): Observable<undefined | WeatherConditions[]>;
}
