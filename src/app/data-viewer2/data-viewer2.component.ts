import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCustomPaginatorInfo } from '../store/selectors/custom-paginator.selectors';

@Component({
  selector: 'app-data-viewer2',
  templateUrl: './data-viewer2.component.html',
  styleUrls: ['./data-viewer2.component.css'],
})
export class DataViewer2Component {
  isUsersToViewUpdated$ = this.store
    .select(selectCustomPaginatorInfo)
    .subscribe({
      next: (res: any) => {
        this.usersToView = res.tasks;
      },
    });
  usersToView: any[] = [];

  constructor(private store: Store) {}
}
