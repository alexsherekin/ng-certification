import {Inject, Injectable, InjectionToken, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, race, timer} from 'rxjs';
import {WeatherConditions} from '../../../shared/structures/weather-conditions';
import {catchError, map, take} from 'rxjs/operators';
import {WeatherServiceInterface} from './weather-service.interface';

export const WEATHER_APP_ID_INJECTION_TOKEN = new InjectionToken<string>('WEATHER_APP_ID_INJECTION_TOKEN');

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements WeatherServiceInterface {
  private readonly HTTP_REQUEST_TIMEOUT = 3000;
  private readonly URL = 'https://openweathermap.org/api';

  constructor(
    private readonly httpClient: HttpClient,
    @Optional() @Inject(WEATHER_APP_ID_INJECTION_TOKEN) private readonly weatherAppId: null | string
  ) {
    this.weatherAppId = this.weatherAppId ?? '5a4b2d457ecbef9eb2a71e480b947604';
  }

  getByZip(zipCode: string): Observable<undefined | WeatherConditions> {
    return race(
      this.httpClient.get<any>(this.getByZipUrl(zipCode), {responseType: 'json'})
        .pipe(
          map(response => this.apiResponseToWeatherConditions(response, zipCode)),
          catchError(error => {
            return of(undefined);
          })
        ),
      timer(this.HTTP_REQUEST_TIMEOUT).pipe(take(1)),
    );
  }

  private getByZipUrl(zipCode: string): string {
    return `${this.URL}/data/2.5/weather?zip=${zipCode},us&appid=${this.weatherAppId}`;
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
