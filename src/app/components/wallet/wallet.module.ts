import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './wallet.component';
import {WalletRoutingModule} from './wallet-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {SimpleNotificationsModule} from 'angular2-notifications';

import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    WalletRoutingModule,
    SharedModule,
    HttpModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [],
  declarations: [WalletComponent],
  bootstrap: [WalletComponent]
})
export class WalletModule { }
