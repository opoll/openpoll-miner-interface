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
        loadChildren: './theme/dashboard/default/default.module#DefaultModule'
      },
      {
        path: 'wallet',
        component: WalletComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
