import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {LocationModule} from '../location/location.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: DashboardComponent,
    }]),
    LocationModule,
  ],
  exports: [
    CommonModule,
    LocationModule,
    RouterModule,
  ]
})
export class DashboardModule { }
