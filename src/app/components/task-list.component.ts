import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../store/actions';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'task-list',
  standalone: true,
  template: `
    <mat-list>
      <mat-list-item *ngFor="let task of tasks">
        <div style="width:100%">
          <span [ngClass]="{ 'completed': task.status === 'completed' }">{{ task.title }}</span>
          <button mat-icon-button color="primary" (click)="edit.emit(task)"><mat-icon>edit</mat-icon></button>
          <button mat-icon-button color="warn" (click)="delete.emit(task.id)"><mat-icon>delete</mat-icon></button>
        </div>
      </mat-list-item>
    </mat-list>
  `,
  styles: [
    `.completed { text-decoration: line-through; }`
  ],
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule]
})
export class TaskListComponent {
  @Input() tasks: Task[] | null = [];
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<number>();
}
