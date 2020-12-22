import { Inject, Injectable, InjectionToken, OnDestroy, Optional } from '@angular/core';
import {interval, Observable, of, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {WeatherConditions} from '../../structures/weather-conditions';
import {WeatherServiceInterface} from '../weather/weather-service.interface';

export const WEATHER_CACHING_TIMEOUT_MS_INJECTION_TOKEN = new InjectionToken<number>('WEATHER_CACHING_TIMEOUT_MS_INJECTION_TOKEN');

@Injectable()
export class WeatherCachingService implements WeatherServiceInterface, OnDestroy {
  private readonly cache = new Map<string, WeatherConditions>();
  private readonly intervalSubscription: Subscription;

  constructor(
    private readonly weatherService: WeatherServiceInterface,
    @Inject(WEATHER_CACHING_TIMEOUT_MS_INJECTION_TOKEN) @Optional() private readonly clearCacheTimeout: null | number
  ) {
    this.intervalSubscription = interval(this.clearCacheTimeout || 10_000).subscribe(() => this.clearCache());
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  getByZip(zipCode: string): Observable<WeatherConditions> {
    if (this.cache.has(zipCode)) {
      return of(this.cache.get(zipCode));
    }

    return this.weatherService.getByZip(zipCode).pipe(
      tap(result => {
        this.cache.set(zipCode, result);
      }),
    );
  }

  private clearCache(): void {
    this.cache.clear();
  }
}
