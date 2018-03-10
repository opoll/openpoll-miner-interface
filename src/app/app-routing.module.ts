import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {WalletComponent} from './components/wallet/wallet.component';
import {SettingsComponent} from './components/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './theme/dashboard/default/default.module#DefaultModule'
      },
      {
        path: 'wallet',
        loadChildren: './components/wallet/wallet.module#WalletModule'
      },
      {
        path: 'settings',
        loadChildren: './components/settings/settings.module#SettingsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
