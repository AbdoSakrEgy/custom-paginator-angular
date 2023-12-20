# Custom pagination
How to paginate some data using custom styles.

## Demo
Check out the live demo of the "custom-paginator" project: [Live Demo](https://abdosakregy.github.io/custom-paginator-angular/)

## Installation
Follow these instructions to run the project locally on your machine:

1. Download the angular project
2. Unzip the project. Suppose, your angular project name is my-app.
3. After Unzip, open the project folder.
4. Press Shift + Mouse Right click on background
5. You will see Open Powershel/Open Window Here on the popup Menu
6. Write the command:
```bash
npm install
```
7. After installing npm, write the command:
```bash
ng serve -open
```
##
## Files 1
custom-paginator.actions.ts
```typescript
import { createAction, props } from '@ngrx/store';

export const modifyCustomPaginatorData = createAction(
  '[custom paginator] modify data',
  props<{ data: any }>()
);
```

custom-paginator.reducer.ts
```typescript
import { createReducer, on } from '@ngrx/store';
import { modifyCustomPaginatorData } from '../actions/custom-paginator.actions';

export const initialState = {
  tasks: [],
  tasksPerPage: 4,
  selectedPage: 1,
  pageNumbers: [1],
  activePageNumber: 1,
};

export const customPaginatorReducer = createReducer(
  initialState,
  on(modifyCustomPaginatorData, (state, { data }) => ({
    tasks: data.tasks,
    tasksPerPage: data.tasksPerPage,
    selectedPage: data.selectedPage,
    pageNumbers: data.pageNumbers,
    activePageNumber: data.activePageNumber,
  }))
);
```

custom-paginator.selectors.ts
```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCustomPaginatorState =
  createFeatureSelector<any>('customPaginator');

export const selectCustomPaginatorInfo = createSelector(
  selectCustomPaginatorState,
  (state) => state
);
```
##
## Files 2
custom-paginator.ts
```typescript
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { modifyCustomPaginatorData } from '../store/actions/custom-paginator.actions';
import { selectTasks } from '../store/selectors/tasks.selectors';
import { selectCustomPaginatorInfo } from '../store/selectors/custom-paginator.selectors';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css'],
})
export class CustomPaginatorComponent implements OnInit {
  tasksList = [];
  tasks: any[] = [];
  tasksPerPage = 4;
  selectedPage = 1;
  pageNumbers = [1];
  activePageNumber = 1;
  isTasksListUpdated$ = this.store.select(selectTasks).subscribe({
    next: (res: any) => {
      this.store.select(selectCustomPaginatorInfo).subscribe({
        next: (res: any) => {
          this.tasks = res.tasks;
          this.tasksPerPage = res.tasksPerPage;
          this.selectedPage = res.selectedPage;
          this.pageNumbers = res.pageNumbers;
          this.activePageNumber = res.activePageNumber;
        },
      });
      this.tasksList = res;
      this.setPage(this.selectedPage);
    },
  });
  // isCustomPaginatorInfoUpdated$ = this.store
  //   .select(selectCustomPaginatorInfo)
  //   .subscribe({
  //     next: (res: any) => {
  //       this.tasks = res.tasks;
  //       this.tasksPerPage = res.tasksPerPage;
  //       this.selectedPage = res.selectedPage;
  //       this.pageNumbers = res.pageNumbers;
  //       this.activePageNumber = res.activePageNumber;
  //     },
  //   });

  constructor(private store: Store) {}
  ngOnInit(): void {
    // this.setPage(this.selectedPage);
  }
  setPage(page: number) {
    // set [tasksList-tasksPerPage-selectedPage-pageNumbers-activePageNumber]
    console.log(this.tasksList);
    const startIndex = (page - 1) * this.tasksPerPage;
    const endIndex = startIndex + this.tasksPerPage;
    this.tasks = this.tasksList.slice(startIndex, endIndex);
    this.activePageNumber = page;
    this.selectedPage = page;
    // set pageNumbers
    const pageCount = Math.ceil(this.tasksList.length / this.tasksPerPage);
    const maxPageCount = 100; // Choose a reasonable maximum page count
    this.pageNumbers = [];
    for (let i = 1; i <= Math.min(pageCount, maxPageCount); i++) {
      this.pageNumbers.push(i);
    }
    // update data to store
    this.store.dispatch(
      modifyCustomPaginatorData({
        data: {
          tasks: this.tasks,
          tasksPerPage: this.tasksPerPage,
          selectedPage: this.selectedPage,
          pageNumbers: this.pageNumbers,
          activePageNumber: this.activePageNumber,
        },
      })
    );
  }
  // changePageSize() - changePage()
  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.tasksPerPage = +newSize;
    this.setPage(1);
  }
  changePage(page: any) {
    if (page >= 1 && page <= this.pageNumbers.length) {
      this.setPage(page);
    }
  }
  // previousPage() - nextPage()
  previousPage() {
    this.changePage(this.selectedPage - 1);
  }
  nextPage() {
    this.changePage(this.selectedPage + 1);
  }
}
```

custom-paginator.html
```html
<main class="p-5 flex flex-col gap-5">
  <div class="flex justify-center items-center gap-3">
    <select
      [value]="tasksPerPage"
      (change)="changePageSize($event)"
      style="
        border: 1px solid black;
        border-radius: 5px;
        outline: none;
        margin-right: 40px;
      "
    >
      <option value="1">1</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="10">10</option>
    </select>
    <button class="btn-previous" (click)="previousPage()">Previous</button>
    <div class="flex justify-center items-center gap-3">
      <button
        [class]="{
          btnOfPagination: page != activePageNumber,
          btnOfPaginationActive: page === activePageNumber
        }"
        *ngFor="let page of pageNumbers"
        (click)="changePage(page)"
      >
        {{ page }}
      </button>
    </div>
    <button class="btn-next" (click)="nextPage()">Next</button>
  </div>
</main>
```
##
## Files 3
data-viewer1.component.ts
```typescript
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCustomPaginatorInfo } from '../store/selectors/custom-paginator.selectors';

@Component({
  selector: 'app-data-viewer1',
  templateUrl: './data-viewer1.component.html',
  styleUrls: ['./data-viewer1.component.css'],
})
export class DataViewer1Component {
  isTasksToViewUpdated$ = this.store
    .select(selectCustomPaginatorInfo)
    .subscribe({
      next: (res: any) => {
        this.tasksToView = res.tasks;
      },
    });
  tasksToView: any[] = [];

  constructor(private store: Store) {}
}
```

data-viewer1.component.html
```html
<main class="text-white px-5">
  <div class="text-2xl font-bold">View data in component 1:-</div>
  <ul>
    <li *ngFor="let task of tasksToView" class="text-[#f64236] text-lg">
      {{ task.username }}
    </li>
  </ul>
</main>
<app-custom-paginator></app-custom-paginator>
```
