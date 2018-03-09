import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MenuItems} from './shared/menu-items/menu-items';
import {BreadcrumbsComponent} from './layout/admin/breadcrumbs/breadcrumbs.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BreadcrumbsComponent,
    WalletComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [MenuItems],
  bootstrap: [AppComponent]
})
export class AppModule { }
