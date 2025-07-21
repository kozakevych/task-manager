import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from './store/actions';
import { selectAllTasks } from './store/selectors';
import * as TaskActions from './store/actions';
import { TaskListComponent } from './components/task-list.component';
import { TaskFormComponent } from './components/task-form.component';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent, TaskFormComponent, AsyncPipe, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'task-manager';
  tasks$: Observable<Task[]>;
  selectedTask: Task | null = null;

  constructor(private store: Store) {
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
}
