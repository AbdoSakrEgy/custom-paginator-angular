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
  isTasksListUpdated$ = this.store.select(selectTasks).subscribe({
    next: (res: any) => {
      this.tasksList = res;
      this.setPage(this.selectedPage);
    },
  });
  isCustomPaginatorInfoUpdated$ = this.store
    .select(selectCustomPaginatorInfo)
    .subscribe({
      next: (res: any) => {
        this.tasks = res.tasks;
        this.tasksPerPage = res.tasksPerPage;
        this.selectedPage = res.selectedPage;
        this.pageNumbers = res.pageNumbers;
        this.activePageNumber = res.activePageNumber;
      },
    });
  tasksList = [];
  tasks: any[] = [];
  tasksPerPage = 4;
  selectedPage = 1;
  pageNumbers = [1];
  activePageNumber = 1;

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
