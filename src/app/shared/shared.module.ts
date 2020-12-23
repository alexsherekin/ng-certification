import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { WeatherConditionsComponent } from './components/weather-conditions/weather-conditions.component';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from '../core/core.module';

@NgModule({
  declarations: [WeatherConditionsComponent],
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    CoreModule,
    HttpClientModule,

    WeatherConditionsComponent,
  ]
})
export class SharedModule { }
