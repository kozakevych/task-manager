import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from '../components/task-list.component';
import { TaskFormComponent } from '../components/task-form.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../store/actions';
import { selectAllTasks } from '../store/selectors';
import * as TaskActions from '../store/actions';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'task-manager',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent, TaskFormComponent, AsyncPipe, CommonModule, MatButtonModule],
  template: `
      <button mat-raised-button color="primary" (click)="logOut()" style='float: right'>Log Out</button>
    <main class="main">
      <h1>Task Manager</h1>
      <task-form
        [initialTask]="selectedTask"
        [submitLabel]="selectedTask ? 'Update' : 'Add'"
        (save)="onSaveTask($event)"
        (cancel)="onCancelEdit()"
      ></task-form>
      <task-list
        [tasks]="tasks$ | async"
        (edit)="onEditTask($event)"
        (delete)="onDeleteTask($event)"
      ></task-list>
    </main>
    <router-outlet />
  `,
})
export class TaskManagerComponent {
  title = 'task-manager';
  tasks$: Observable<Task[]>;
  selectedTask: Task | null = null;

  constructor(private store: Store, public authService: AuthService, private router: Router) {
    this.tasks$ = this.store.select(selectAllTasks);
    this.store.dispatch(TaskActions.loadTasks());
  }

  onSaveTask(task: Omit<Task, 'id'>) {
    if (this.selectedTask) {
      this.store.dispatch(TaskActions.updateTask({ task: { ...this.selectedTask, ...task } }));
    } else {
      this.store.dispatch(TaskActions.addTask({ task }));
    }
    this.selectedTask = null;
  }

  onEditTask(task: Task) {
    this.selectedTask = task;
  }

  onDeleteTask(id: string) {
    this.store.dispatch(TaskActions.deleteTask({ id }));
    if (this.selectedTask && this.selectedTask.id === id) {
      this.selectedTask = null;
    }
  }

  onCancelEdit() {
    this.selectedTask = null;
  }

  logOut() {
    this.authService.logout();
    this.store.dispatch(TaskActions.loadTasks());
    this.router.navigate(['/login']);
  }
}
