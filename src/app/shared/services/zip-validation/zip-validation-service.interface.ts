import {Injectable, InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {CoreModule} from '../../../core/core.module';
import {ZipValidationService} from './zip-validation.service';

export const ZIP_VALIDATION_API_KEY_INJECTION_TOKEN = new InjectionToken<string>('ZIP_VALIDATION_API_KEY_INJECTION_TOKEN');

@Injectable({
  providedIn: CoreModule,
  useClass: ZipValidationService,
})
export abstract class ZipValidationServiceInterface {
  public abstract validate(zipCode: string): Observable<boolean>;
}
