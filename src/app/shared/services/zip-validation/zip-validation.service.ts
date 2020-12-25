import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ZipValidationServiceInterface} from './zip-validation-service.interface';

@Injectable()
export class ZipValidationService implements ZipValidationServiceInterface {
  private readonly URL = 'https://api.zippopotam.us/us';
  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public validate(zipCode: string): Observable<boolean> {
    return this.httpClient.get<void>(this.getValidationURL(zipCode)).pipe(
      map(() => true)
    );
  }

  private getValidationURL(zipCode: string): string {
    return `${this.URL}/${zipCode}`;
  }
}
