import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChartWidgetComponent} from './chart-widget.component';

const routes: Routes = [
  {
    path: '',
    component: ChartWidgetComponent,
    data: {
      title: 'Chart Widget',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartWidgetRoutingModule { }
