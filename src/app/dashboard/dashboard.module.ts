import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {LocationModule} from '../location/location.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: DashboardComponent,
    }]),
    LocationModule,
    SharedModule,
  ],
  exports: [
    CommonModule,
    LocationModule,
    RouterModule,
    SharedModule,
  ]
})
export class DashboardModule { }
