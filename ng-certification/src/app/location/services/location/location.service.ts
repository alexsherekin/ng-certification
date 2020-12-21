import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {LocationStorageService} from '../../../shared/services/location-storage/location-storage.service';
import {LocationData} from '../../structures/location-data';

@Injectable()
export class LocationService {
  private readonly locationsSubject = new BehaviorSubject<string[]>([]);
  readonly locations$ = this.locationsSubject.asObservable();

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

  private areEqual(a: LocationData, b: LocationData): boolean {
    return a.zip === b.zip;
  }
}
