import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {LocationStorageService} from '../../../shared/services/location-storage/location-storage.service';
import {LocationData} from '../../structures/location-data';
import {LocationServiceInterface} from './location-service.interface';

@Injectable()
export class LocationService implements LocationServiceInterface {
  readonly locations$ = this.storage.value$;

  constructor(private readonly storage: LocationStorageService) { }

  get(): Observable<LocationData[]> {
    return this.storage.get();
  }

  add(newLocation: LocationData): Observable<void> {
    return this.storage.get().pipe(
      switchMap((locations: undefined | LocationData[]) => {
        if (!locations || !Array.isArray(locations)) {
          locations = [];
        }

        // Location already exists
        if (locations.find(location => this.areEqual(location, newLocation))) {
          return of(locations);
        }

        return this.storage.add([...locations, newLocation]);
      }),
      map(() => {}),
    );
  }

  remove(locationToRemove: LocationData): Observable<void> {
    return this.storage.get().pipe(
      switchMap((locations: undefined | LocationData[]) => {
        if (!locations || !Array.isArray(locations)) {
          return EMPTY;
        }

        const updatedLocations = locations.filter(location => !this.areEqual(location, locationToRemove));
        // Location does not exist
        if (updatedLocations.length === locations.length) {
          return EMPTY;
        }
        return this.storage.update(updatedLocations);
      }),
      map(() => {}),
    );
  }

  private areEqual(a: LocationData, b: LocationData): boolean {
    return a.zip === b.zip;
  }
}
