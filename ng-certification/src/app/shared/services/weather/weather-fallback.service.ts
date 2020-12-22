import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, race, timer} from 'rxjs';
import {WeatherConditions} from '../../structures/weather-conditions';
import {catchError, map, take} from 'rxjs/operators';
import {WeatherServiceInterface} from './weather-service.interface';
import {responseConverter} from './response-converter';

@Injectable({
  providedIn: 'root'
})
export class WeatherFallbackService implements WeatherServiceInterface {
  private readonly HTTP_REQUEST_TIMEOUT = 3000;
  private readonly URL = 'https://lp-store.herokuapp.com/weather?zipcode=95742';

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  getByZip(zipCode: string): Observable<undefined | WeatherConditions> {
    return race(
      this.httpClient.get<any>(this.URL, {responseType: 'json'})
        .pipe(
          map(response => responseConverter(response, zipCode)),
          catchError(error => {
            return of(undefined);
          })
        ),
      timer(this.HTTP_REQUEST_TIMEOUT).pipe(take(1)),
    );
  }
}
