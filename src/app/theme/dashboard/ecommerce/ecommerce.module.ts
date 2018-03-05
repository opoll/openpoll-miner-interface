import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceComponent } from './ecommerce.component';
import {EcommerceRoutingModule} from './ecommerce-routing.module';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EcommerceRoutingModule,
    SharedModule
  ],
  declarations: [EcommerceComponent]
})
export class EcommerceModule { }
