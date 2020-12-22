import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, finalize, map, switchMap, tap} from 'rxjs/operators';
import {WeatherCachingServiceInterface} from '../../../shared/services/weather-caching/weather-caching-service.interface';
import {WeatherConditions} from '../../../shared/structures/weather-conditions';
import weatherConditionConverter from '../../../shared/utils/weather-condition-to-image';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastComponent implements OnInit {
  private readonly isLoadingSubject = new BehaviorSubject<boolean>(false);
  readonly isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  readonly data$: Observable<WeatherConditions[]>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly weatherCachingService: WeatherCachingServiceInterface,
  ) {
    this.data$ = this.activatedRoute.params.pipe(
      tap(() => {
        this.isLoadingSubject.next(true);
      }),
      map(params => params.zipCode),
      switchMap((zipCode: string) => {
        return this.weatherCachingService.get5DaysByZip(zipCode).pipe(
          catchError(error => {
            return [];
          })
        );
      }),
      map(conditions => conditions.filter(Boolean)),
      tap(() => this.isLoadingSubject.next(false)),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  ngOnInit(): void {
  }

  getImage(condition: WeatherConditions): string {
    return weatherConditionConverter[condition.current];
  }

  trackByCondition = (index: number, condition: WeatherConditions): string => {
    return condition.place;
  }
}
