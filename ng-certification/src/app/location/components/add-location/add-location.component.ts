import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, Subscription} from 'rxjs';
import {delay, finalize} from 'rxjs/operators';
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

  constructor(
    formBuilder: FormBuilder,
    private readonly locationService: LocationServiceInterface,
  ) {
    this.formGroup = formBuilder.group({
      zipCode: ''
    });

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
