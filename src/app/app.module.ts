import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MenuItems} from './shared/menu-items/menu-items';
import {BreadcrumbsComponent} from './layout/admin/breadcrumbs/breadcrumbs.component';

import { DataService } from './services/data.service';
import { TokenService } from './services/token.service';
import { WebSocketService } from './services/web-socket.service';
import { EventService } from './services/event.service';
import { ToastService } from './services/toast.service';

import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BreadcrumbsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpModule,
  ],
  providers: [
    MenuItems,
    DataService,
    TokenService,
    WebSocketService,
    EventService,
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
