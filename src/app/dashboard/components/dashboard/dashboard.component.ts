import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, merge, Observable, of} from 'rxjs';
import {catchError, concatMap, finalize, map, switchMap, tap, toArray} from 'rxjs/operators';
import {LocationServiceInterface} from '../../../location/services/location/location-service.interface';
import {LocationData} from '../../../location/structures/location-data';
import {WeatherConditions} from '../../../shared/structures/weather-conditions';
import {WeatherCachingServiceInterface} from '../../../shared/services/weather-caching/weather-caching-service.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private hasErrorSubject = new BehaviorSubject<boolean>(false);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  hasError$: Observable<boolean> = this.hasErrorSubject.asObservable();
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  conditions$!: Observable<WeatherConditions[]>;

  constructor(
    private readonly locationService: LocationServiceInterface,
    private readonly weatherService: WeatherCachingServiceInterface,
  ) {
  }

  ngOnInit(): void {
    this.conditions$ = merge(
      this.locationService.get(),
      this.locationService.locations$
    ).pipe(
      tap(() => {
        this.isLoadingSubject.next(true);
        this.hasErrorSubject.next(false);
      }),
      switchMap((locations: undefined | LocationData[]): Observable<WeatherConditions[]> => {
        if (!locations || locations.length <= 0) {
          return of([]);
        }

        return of(...locations).pipe(
          concatMap((location: LocationData) =>
            this.weatherService.getByZip(location.zip)
              .pipe(
                catchError(error => of(undefined))
              )
          ),
          toArray(),
          map(conditions => conditions.filter(Boolean))
        );
      }),
      tap(() => this.isLoadingSubject.next(false)),
      finalize(() => this.isLoadingSubject.next(false)),
      catchError(() => {
        this.hasErrorSubject.next(true);
        return of([]);
      }),
    );
  }

  trackByCondition = (index: number, condition: WeatherConditions): string => {
    return condition.place;
  }

  removeLocation(zipCode: string): void {
    this.locationService.remove({zip: zipCode}).subscribe();
  }
}
