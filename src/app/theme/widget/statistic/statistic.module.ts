import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './statistic.component';
import {StatisticRoutingModule} from './statistic-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';

@NgModule({
  imports: [
    CommonModule,
    StatisticRoutingModule,
    SharedModule,
    ChartModule
  ],
  declarations: [StatisticComponent]
})
export class StatisticModule { }
