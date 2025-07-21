import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as TaskActions from './actions';
import { Task, NewTask } from './actions';
import { Store } from '@ngrx/store';
import { State } from './reducer';
import { selectAllTasks } from './selectors';
import { environment } from '../../environments/environment';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private store: Store<State> = inject(Store);

  constructor(public http: HttpClient) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.http.get<Task[]>(`${environment.apiUrl}/tasks`).pipe(
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
      mergeMap(([{ task }]) => {
        console.log('Adding task:', task);
        const newTask: NewTask = { ...task};
        return this.http.post<Task>(`${environment.apiUrl}/tasks`, newTask).pipe(
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
        this.http.put<Task>(`${environment.apiUrl}/tasks/${task.id}`, task).pipe(
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
        this.http.delete<string>(`${environment.apiUrl}/tasks/${id}`).pipe(
          map(_ => TaskActions.deleteTaskSuccess({ id })),
          catchError(error => of(TaskActions.deleteTaskFailure({ error })))
        )
      )
    )
  );
}
