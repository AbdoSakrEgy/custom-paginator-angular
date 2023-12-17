import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Store } from '@ngrx/store';
import { updateTasks } from './store/actions/tasks.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'custom-paginator';

  constructor(private data: DataService, private store: Store) {}
  ngOnInit(): void {
    this.data.getTasks().subscribe({
      next: (res: any) => {
        this.store.dispatch(updateTasks({ data: res }));
      },
    });
  }
}
