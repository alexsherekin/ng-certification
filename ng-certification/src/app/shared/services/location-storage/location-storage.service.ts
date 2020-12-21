import { Injectable } from '@angular/core';
import {StorageService} from '../../../core/services/storage/storage.service';
import {LocationData} from '../../../location/structures/location-data';

@Injectable({
  providedIn: 'root'
})
export class LocationStorageService extends StorageService<LocationData[]> {
  constructor() {
    super('MY_LOCATIONS');
  }
}
