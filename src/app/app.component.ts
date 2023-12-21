import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Store } from '@ngrx/store';
import {
  updateIsLoadingTasks,
  updateTasks,
} from './store/actions/tasks.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'custom-paginator';

  constructor(private data: DataService, private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(updateIsLoadingTasks({ payload: true }));
    this.data.getTasks().subscribe({
      next: (res: any) => {
        this.store.dispatch(updateTasks({ payload: res }));
        this.store.dispatch(updateIsLoadingTasks({ payload: false }));
      },
    });
  }
}
