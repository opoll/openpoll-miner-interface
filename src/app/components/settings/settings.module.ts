import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import {SettingsRoutingModule} from './settings-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {SimpleNotificationsModule} from 'angular2-notifications';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    HttpModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [],
  declarations: [SettingsComponent],
  bootstrap: [SettingsComponent]
})
export class SettingsModule { }
