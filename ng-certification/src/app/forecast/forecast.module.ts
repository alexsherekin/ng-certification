import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ForecastComponent} from './components/forecast/forecast.component';
import { WeatherConditionCompactPipe } from './pipes/weather-condition-compact/weather-condition-compact.pipe';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [ForecastComponent, WeatherConditionCompactPipe],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ForecastComponent
      }
    ]),
    SharedModule,
  ],
  exports: [
    CommonModule,
    SharedModule,
  ]
})
export class ForecastModule { }
