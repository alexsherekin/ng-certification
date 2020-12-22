import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {concatMap, finalize, map, startWith, switchMap, tap, toArray} from 'rxjs/operators';
import {WeatherServiceInterface} from '../../../shared/services/weather/weather-service.interface';
import {LocationServiceInterface} from '../../../location/services/location/location-service.interface';
import {LocationData} from '../../../location/structures/location-data';
import {WeatherConditions} from '../../../shared/structures/weather-conditions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  readonly conditions$: Observable<WeatherConditions[]> =
    this.locationService.locations$.pipe(
      switchMap((locations: undefined | LocationData[]): Observable<WeatherConditions[]> => {
        if (!locations || locations.length <= 0) {
          return of([]);
        }

        this.isLoadingSubject.next(true);
        this.cd.detectChanges(); // HACK to show the initial loading state

        return of(...locations).pipe(
          concatMap((location: LocationData) => {
            return this.weatherService.getByZip(location.zip, true);
          }),
          toArray(),
          map(conditions => conditions.filter(Boolean))
        );
      }),
      tap(() => this.isLoadingSubject.next(false)),
      finalize(() => this.isLoadingSubject.next(false)),
    );

  constructor(
    private readonly locationService: LocationServiceInterface,
    private readonly weatherService: WeatherServiceInterface,
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
  }

  trackByCondition = (index: number, condition: WeatherConditions): string => {
    return condition.place;
  }

  removeLocation(zipCode: string): void {
    this.locationService.remove({zip: zipCode}).subscribe();
  }
}
