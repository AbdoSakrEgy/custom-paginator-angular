import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomPaginatorComponent } from './custom-paginator/custom-paginator.component';
import { StoreModule } from '@ngrx/store';
import { DataChangerComponent } from './data-changer/data-changer.component';
import { customPaginatorReducer } from './store/reducers/custom-paginator.reducer';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { tasksReducer } from './store/reducers/tasks.reducer';
import { DataViewer1Component } from './data-viewer1/data-viewer1.component';
import { DataViewer2Component } from './data-viewer2/data-viewer2.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomPaginatorComponent,
    DataChangerComponent,
    DataViewer1Component,
    DataViewer2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      customPaginator: customPaginatorReducer,
      tasks: tasksReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
