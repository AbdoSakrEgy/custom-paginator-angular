import { createAction, props } from '@ngrx/store';

export const updateTasks = createAction(
  '[tasks] modify tasks',
  props<{ data: any }>()
);
