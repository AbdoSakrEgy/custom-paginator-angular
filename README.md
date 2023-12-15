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

## Files
custom-paginator.ts
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css'],
})
export class CustomPaginatorComponent implements OnInit {
  tasksList = tasksListData;
  tasks: any[] = [];
  tasksPerPage: number = 4;
  selectedPage = 1;
  pageNumbers = [1];
  activePageNumber = 1;

  ngOnInit(): void {
    let pageIndex = (this.selectedPage - 1) * this.tasksPerPage;
    this.tasks = this.tasksList.slice(pageIndex, this.tasksPerPage);
  }
  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.tasksPerPage = Number(newSize);
    this.changePage(1);
  }
  setPageNumbers() {
    this.pageNumbers = Array(
      Math.ceil(this.tasksList.length / this.tasksPerPage)
    )
      .fill(0)
      .map((x, i) => i + 1);
  }
  changePage(page: any) {
    this.selectedPage = page;
    this.slicedTasks();
    this.activePageNumber = page;
  }
  slicedTasks() {
    let pageIndex = (this.selectedPage - 1) * this.tasksPerPage;
    let endIndex =
      (this.selectedPage - 1) * this.tasksPerPage + this.tasksPerPage;
    this.tasks = [];
    this.tasks = this.tasksList.slice(pageIndex, endIndex);
  }
  // previousPage() - nextPage()
  previousPage() {
    if (this.selectedPage > 1) {
      this.changePage(this.selectedPage - 1);
    }
  }
  nextPage() {
    if (this.selectedPage < this.pageNumbers.length) {
      this.changePage(this.selectedPage + 1);
    }
  }
}

//---------------------------------------------------------
export const tasksListData: any[] = [
  {
    img: 'assets/task1.jpg',
    title: 'task1',
    deadLine: '29-11-2029',
  },
  {
    img: 'assets/task2.jpg',
    title: 'task2',
    deadLine: '29-11-2029',
  },
  {
    img: 'assets/task3.jpg',
    title: 'task3',
    deadLine: '29-11-2029',
  },
  {
    img: 'assets/task4.jpg',
    title: 'task4',
    deadLine: '29-11-2029',
  },
  {
    img: 'assets/task5.jpg',
    title: 'task5',
    deadLine: '29-11-2029',
  },
  {
    img: 'assets/task6.jpg',
    title: 'task6',
    deadLine: '29-11-2029',
  },
  {
    img: 'assets/task7.jpg',
    title: 'task7',
    deadLine: '29-11-2029',
  },
  {
    img: 'assets/task8.jpg',
    title: 'task8',
    deadLine: '29-11-2029',
  },
  {
    img: 'assets/task9.jpg',
    title: 'task9',
    deadLine: '29-11-2029',
  },
  {
    img: 'assets/task10.jpg',
    title: 'task10',
    deadLine: '29-11-2029',
  },
];
```

custom-paginator.html
```html
<!-- data view -->
<div class="text-bold text-4xl text-center p-5">
  How to create custom pagination
</div>
<main class="flex justify-center items-center gap-3 flex-wrap p-5">
  <div class="card" *ngFor="let task of tasks">
    <div class="text-5xl mb-5 text-[#cb075a]">{{ task.title }}</div>
    <span class="text-xs mb-2 text-[#b1b0b2]">
      Dead-Line date:{{ task.deadLine }}
    </span>
    <span class="text-xs mb-2">desc</span>
    <div class="flex gap-2">
      <button class="btnDetails">Details</button>
      <button class="btnComplete">Complete</button>
    </div>
  </div>
</main>
<!-- paginator -->
<main class="flex justify-center items-center gap-3">
  <select
    [value]="tasksPerPage"
    (change)="changePageSize($event)"
    style="border: 1px solid black; border-radius: 5px; outline: none"
  >
    <option value="1">1</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="10">10</option>
  </select>
  <button class="hover:cursor-pointer" (click)="previousPage()">
    Previous
  </button>
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
  <button class="hover:cursor-pointer" (click)="nextPage()">Next</button>
</main>
```

