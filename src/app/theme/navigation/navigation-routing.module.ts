import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from './navigation.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    data: {
      title: 'Variants of nav bar',
      icon: 'ti-layout-cta-right',
      caption: 'variants color of nav bar',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
