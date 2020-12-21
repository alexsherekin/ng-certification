import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLocationComponent } from './components/add-location/add-location.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [AddLocationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    AddLocationComponent,
  ]
})
export class LocationModule { }
