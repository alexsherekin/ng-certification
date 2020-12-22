import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {WeatherConditions} from '../../../shared/structures/weather-conditions';
import {catchError, map} from 'rxjs/operators';
import {WeatherServiceInterface} from './weather-service.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherFallbackService implements WeatherServiceInterface {
  private readonly URL = 'https://lp-store.herokuapp.com/weather?zipcode=95742';

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  getByZip(zipCode: string): Observable<undefined | WeatherConditions> {
    return this.httpClient.get<any>(this.URL, {responseType: 'json'})
      .pipe(
        map(response => this.apiResponseToWeatherConditions(response, zipCode)),
        catchError(error => {
          return of(undefined);
        })
      );
  }

  private apiResponseToWeatherConditions = (response: any, zipCode: string): WeatherConditions => {
    return {
      zipCode,
      place: response.name,
      current: response.weather[0].main,
      temperature: response.main.temp,
      maxTemperature: response.main.temp_max,
      minTemperature: response.main.temp_min,
    };
  }
}
