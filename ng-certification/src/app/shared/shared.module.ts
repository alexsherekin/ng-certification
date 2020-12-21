import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { WeatherConditionsComponent } from './components/weather-conditions/weather-conditions.component';

@NgModule({
  declarations: [WeatherConditionsComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    WeatherConditionsComponent,
  ]
})
export class SharedModule { }
