import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {concatMap, finalize, switchMap, tap} from 'rxjs/operators';
import {WeatherServiceInterface} from '../../../core/services/weather/weather-service.interface';
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
  readonly conditions$: Observable<WeatherConditions> =
    this.locationService.locations$.pipe(
      tap(() => this.isLoadingSubject.next(true)),
      switchMap((locations: LocationData[]) => {
        return of(...locations).pipe(
          concatMap((location: LocationData) => {
            return this.weatherService.getByZip(location.zip);
          }),
        );
      }),
      finalize(() => this.isLoadingSubject.next(false)),
    );

  constructor(
    private readonly locationService: LocationServiceInterface,
    private readonly weatherService: WeatherServiceInterface,
  ) {
  }

  ngOnInit(): void {
  }

  trackByCondition = (index: number, condition: WeatherConditions): string => {
    return condition.place;
  }
}
