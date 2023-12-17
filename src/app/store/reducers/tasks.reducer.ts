import { createReducer, on } from '@ngrx/store';
import { updateTasks } from '../actions/tasks.actions';

export const initialState = [];

export const tasksReducer = createReducer(
  initialState,
  on(updateTasks, (state, { data }) => data)
);
