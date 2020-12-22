import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CoreModule} from '../../../core/core.module';
import {WeatherConditions} from '../../structures/weather-conditions';
import {WeatherServiceInterface} from '../weather/weather-service.interface';
import {WeatherCachingService} from './weather-caching.service';

@Injectable({
  providedIn: CoreModule,
  useClass: WeatherCachingService,
})
export abstract class WeatherCachingServiceInterface implements WeatherServiceInterface {
  abstract getByZip(zipCode: string): Observable<WeatherConditions>;
}
