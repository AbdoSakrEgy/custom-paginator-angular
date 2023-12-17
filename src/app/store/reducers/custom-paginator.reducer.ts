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
