import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, finalize, map, startWith} from 'rxjs/operators';
import {ZipValidationServiceInterface} from '../../../shared/services/zip-validation/zip-validation-service.interface';
import {ZipCodeValidatorDirective} from '../../validators/zip-code.validator';
import {LocationServiceInterface} from '../../services/location/location-service.interface';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddLocationComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Subscription[] = [];

  private disabledSubject = new BehaviorSubject<boolean>(false);
  disabled$ = this.disabledSubject.asObservable();

  readonly formGroup: FormGroup;
  readonly isAddButtonDisabled$: Observable<boolean>;
  readonly isFormInvalid$: Observable<boolean>;

  constructor(
    formBuilder: FormBuilder,
    private readonly locationService: LocationServiceInterface,
    zipValidationService: ZipValidationServiceInterface,
  ) {

    this.formGroup = formBuilder.group({
      zipCode: ''
    }, {
      asyncValidators: [new ZipCodeValidatorDirective(zipValidationService)],
      updateOn: 'change'
    });

    this.isFormInvalid$ = this.formGroup.statusChanges.pipe(
      map(status => status !== 'VALID' && status !== 'PENDING'),
      distinctUntilChanged(),
    );

    this.isAddButtonDisabled$ = combineLatest([
      this.formGroup.statusChanges.pipe(startWith('')),
      this.disabled$.pipe(startWith(false)),
      this.formGroup.controls.zipCode.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([formStatus, isFormDisabled, zipCode]: [string, boolean, string]): boolean =>
        formStatus !== 'VALID' || isFormDisabled || !zipCode
      ),
    );

    this.subscriptions.push(
      this.disabled$.subscribe(disabled => {
        disabled ? this.formGroup.disable() : this.formGroup.enable();
      })
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onFormSubmit(): void {
    const newZipCode: string = this.formGroup.controls.zipCode.value;

    this.disabledSubject.next(true);
    this.locationService.add({zip: newZipCode})
      .pipe(
        finalize(() => {
          this.disabledSubject.next(false);
          this.formGroup.controls.zipCode.reset();
        })
      )
      .subscribe();
  }
}
