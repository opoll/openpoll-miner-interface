import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WalletComponent} from './wallet.component';

const routes: Routes = [
  {
    path: '',
    component: WalletComponent,
    data: {
      title: 'Default',
      icon: 'ti-home',
      caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
