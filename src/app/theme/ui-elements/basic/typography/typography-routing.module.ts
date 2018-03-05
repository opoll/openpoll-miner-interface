import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TypographyComponent} from './typography.component';

const routes: Routes = [
  {
    path: '',
    component: TypographyComponent,
    data: {
      title: 'Typography',
      icon: 'ti-layout-grid2-alt',
      caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - typography',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypographyRoutingModule { }
