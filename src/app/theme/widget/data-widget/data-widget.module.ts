import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataWidgetComponent } from './data-widget.component';
import {DataWidgetRoutingModule} from './data-widget-routing.module';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DataWidgetRoutingModule,
    SharedModule
  ],
  declarations: [DataWidgetComponent]
})
export class DataWidgetModule { }
