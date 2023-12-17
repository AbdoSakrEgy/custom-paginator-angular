import { createAction, props } from '@ngrx/store';

export const modifyCustomPaginatorData = createAction(
  '[custom paginator] modify data',
  props<{ data: any }>()
);
