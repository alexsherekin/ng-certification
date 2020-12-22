import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {WeatherConditions} from '../../structures/weather-conditions';
import {CoreModule} from '../../../core/core.module';
import {WeatherFallbackService} from './weather-fallback.service';

@Injectable({
  providedIn: CoreModule,
  useClass: WeatherFallbackService,
})
export abstract class WeatherServiceInterface {
  abstract getByZip(zipCode: string): Observable<WeatherConditions>;
  abstract get5DaysByZip(zipCode: string): Observable<undefined | WeatherConditions[]>;
}
