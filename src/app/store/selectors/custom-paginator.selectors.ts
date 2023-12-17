import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCustomPaginatorState =
  createFeatureSelector<any>('customPaginator');

export const selectCustomPaginatorInfo = createSelector(
  selectCustomPaginatorState,
  (state) => state
);
