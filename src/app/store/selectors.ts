import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './reducer';

export const selectTaskState = createFeatureSelector<State>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state) => state.tasks
);

export const selectTaskError = createSelector(
  selectTaskState,
  (state) => state.error
);
