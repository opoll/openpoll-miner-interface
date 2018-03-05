import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard',
      status: false
    },
    children: [
      {
        path: 'default',
        loadChildren: './default/default.module#DefaultModule'
      },
      {
        path: 'ecommerce',
        loadChildren: './ecommerce/ecommerce.module#EcommerceModule'
      },
      {
        path: 'analytics',
        loadChildren: './analytics/analytics.module#AnalyticsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
