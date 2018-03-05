import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataWidgetComponent} from './data-widget.component';

const routes: Routes = [
  {
    path: '',
    component: DataWidgetComponent,
    data: {
      title: 'Data Widget',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataWidgetRoutingModule { }
