import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LocationData} from '../../structures/location-data';
import {LocationService} from './location.service';

@Injectable({
  providedIn: 'root',
  useClass: LocationService,
})
export abstract class LocationServiceInterface {
  readonly locations$: Observable<LocationData[]>;
  abstract get(): Observable<LocationData[]>;
  abstract add(newLocation: LocationData): Observable<void>;
}
