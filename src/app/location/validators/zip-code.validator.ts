import {HttpErrorResponse} from '@angular/common/http';
import {AsyncValidator, FormGroup} from '@angular/forms';
import {Observable, of, timer} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ZipValidationServiceInterface} from '../../shared/services/zip-validation/zip-validation-service.interface';

export type ZipCodeValidationResult = null | {zipCodeInvalid: boolean};

export class ZipCodeValidatorDirective implements AsyncValidator {
  private readonly cache = new Map<string, ZipCodeValidationResult>();
  constructor(
    private readonly zipValidationService: ZipValidationServiceInterface,
  ) {
  }

  validate(group: FormGroup): Observable<ZipCodeValidationResult> {
    const zipCode: string = group.value.zipCode;
    if (!zipCode) {
      return of(null);
    }

    if (!/^[0-9]+$/g.test(zipCode)) {
      return of({zipCodeInvalid: true});
    }

    return this.cache.has(zipCode) ?
      of(this.cache.get(zipCode)) :
      timer(1000).pipe(
        switchMap(() => this.zipValidationService.validate(group.value.zipCode)),
        map((): null => {
          this.cache.set(zipCode, null);
          return null;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.cache.set(zipCode, {zipCodeInvalid: true});
          }
          return of({zipCodeInvalid: true});
        }),
      );
  }
}
