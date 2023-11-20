import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css'],
})
export class CustomPaginatorComponent implements OnInit {
  tasksList = tasksList;
  tasks: any[] = [];
  tasksPerPage: number = 4;
  public selectedPage = 1;
  activePageNumber = 1;

  ngOnInit(): void {
    let pageIndex = (this.selectedPage - 1) * this.tasksPerPage;
    this.tasks = tasksList.slice(pageIndex, this.tasksPerPage);
  }
  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.tasksPerPage = Number(newSize);
    this.changePage(1);
  }
  get pageNumbers(): number[] {
    return Array(Math.ceil(tasksList.length / this.tasksPerPage))
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
}

//---------------------------------------------------------
export const tasksList: any[] = [
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
