import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataViewer1Component } from './data-viewer1/data-viewer1.component';
import { DataViewer2Component } from './data-viewer2/data-viewer2.component';
import { DataChangerComponent } from './data-changer/data-changer.component';
import { CustomPaginatorComponent } from './custom-paginator/custom-paginator.component';

const routes: Routes = [
  { path: 'custom-paginator', component: CustomPaginatorComponent },
  { path: 'data-viewer1', component: DataViewer1Component },
  { path: 'data-viewer2', component: DataViewer2Component },
  { path: 'data-changer', component: DataChangerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
