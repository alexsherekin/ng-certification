import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, race, timer} from 'rxjs';
import {WeatherConditions} from '../../structures/weather-conditions';
import {catchError, map, take} from 'rxjs/operators';
import {WeatherServiceInterface} from './weather-service.interface';
import {getByZipResponseConverter} from './response-converter';

@Injectable({
  providedIn: 'root'
})
export class WeatherFallbackService implements WeatherServiceInterface {
  private readonly HTTP_REQUEST_TIMEOUT = 3000;
  private readonly FALLBACK_ZIP_CODES = ['95742', '10001', '33101'];
  private readonly BUILD_URL = (zipCode: string) => `https://lp-store.herokuapp.com/weather?zipcode=${zipCode}`;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  getByZip(zipCode: string): Observable<undefined | WeatherConditions> {
    const randomZipCodeIndex = Math.floor(Math.random() * 100) % this.FALLBACK_ZIP_CODES.length;
    return race(
      this.httpClient.get<any>(this.BUILD_URL(this.FALLBACK_ZIP_CODES[randomZipCodeIndex]), {responseType: 'json'})
        .pipe(
          map(response => getByZipResponseConverter(response, zipCode)),
          catchError(error => {
            return of(undefined);
          })
        ),
      timer(this.HTTP_REQUEST_TIMEOUT).pipe(
        take(1),
        map(() => {
          throw new Error('Timeout');
        })
      ),
    );
  }

  get5DaysByZip(zipCode: string): Observable<undefined | WeatherConditions[]> {
    return race(
      this.getByZip(zipCode).pipe(
        map(condition => [condition, condition, condition, condition, condition])
      ),
      timer(this.HTTP_REQUEST_TIMEOUT).pipe(
        take(1),
        map(() => {
          throw new Error('Timeout');
        })
      ),
    );
  }
}
