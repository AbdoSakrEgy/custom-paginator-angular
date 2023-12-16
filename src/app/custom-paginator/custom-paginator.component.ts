import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css'],
})
export class CustomPaginatorComponent implements OnInit {
  tasksList = tasksListData;
  tasks: any[] = [];
  tasksPerPage = 4;
  selectedPage = 1;
  pageNumbers = [1];
  activePageNumber = 1;

  ngOnInit(): void {
    this.setPage(this.selectedPage);
  }
  setPage(page: number) {
    const startIndex = (page - 1) * this.tasksPerPage;
    const endIndex = startIndex + this.tasksPerPage;
    this.tasks = this.tasksList.slice(startIndex, endIndex);
    this.pageNumbers = Array(
      Math.ceil(this.tasksList.length / this.tasksPerPage)
    )
      .fill(0)
      .map((x, i) => i + 1);
    this.activePageNumber = page;
    this.selectedPage = page;
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
