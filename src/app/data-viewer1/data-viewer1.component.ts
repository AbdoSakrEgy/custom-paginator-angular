import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCustomPaginatorInfo } from '../store/selectors/custom-paginator.selectors';
import { selectIsLoadingTasks } from '../store/selectors/tasks.selectors';

@Component({
  selector: 'app-data-viewer1',
  templateUrl: './data-viewer1.component.html',
  styleUrls: ['./data-viewer1.component.css'],
})
export class DataViewer1Component {
  tasksToView: any[] = [];
  isLoading$ = this.store.select(selectIsLoadingTasks);
  isTasksToViewUpdated$ = this.store
    .select(selectCustomPaginatorInfo)
    .subscribe({
      next: (res: any) => {
        this.tasksToView = res.tasks;
      },
    });

  constructor(private store: Store) {}
}
