import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as TaskActions from './actions';
import { Task } from './actions';
import { Store } from '@ngrx/store';
import { State } from './reducer';
import { selectAllTasks } from './selectors';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private store: Store<State> = inject(Store);

  constructor() {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        // Replace with actual API call
        of([{ id: 1, title: 'Sample Task', status: 'pending' as const }]).pipe(
          map(tasks => TaskActions.loadTasksSuccess({ tasks })),
          catchError(error => of(TaskActions.loadTasksFailure({ error })))
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      withLatestFrom(this.store.select(selectAllTasks)),
      mergeMap(([{ task }, tasks]) => {
        const newTask: Task = { ...task, id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1 };
        return of(newTask).pipe(
          map(task => TaskActions.addTaskSuccess({ task })),
          catchError(error => of(TaskActions.addTaskFailure({ error })))
        );
      })
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      mergeMap(({ task }) =>
        of(task).pipe(
          map(task => TaskActions.updateTaskSuccess({ task })),
          catchError(error => of(TaskActions.updateTaskFailure({ error })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap(({ id }) =>
        of(id).pipe(
          map(id => TaskActions.deleteTaskSuccess({ id })),
          catchError(error => of(TaskActions.deleteTaskFailure({ error })))
        )
      )
    )
  );
}
