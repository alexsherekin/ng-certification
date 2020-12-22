import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { WeatherConditionsComponent } from './components/weather-conditions/weather-conditions.component';
import {CoreModule} from "../core/core.module";

@NgModule({
  declarations: [WeatherConditionsComponent],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports: [
    CommonModule,
    CoreModule,

    WeatherConditionsComponent,
  ]
})
export class SharedModule { }
